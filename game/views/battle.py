# game/views/battle.py
from django.shortcuts import render, redirect
from game.models import Character, Enemy, Skill
from django.views.decorators.http import require_GET
import random

def generate_enemy() -> Enemy:
    enemy_types = [
        {"name": "スライム", "max_hp": 30, "attack": 6, "defense": 2, "exp": 5, "gold": 3},
        {"name": "ゴブリン", "max_hp": 45, "attack": 8, "defense": 4, "exp": 8, "gold": 5},
        {"name": "オオカミ", "max_hp": 55, "attack": 10, "defense": 5, "exp": 10, "gold": 7}
    ]
    base = random.choice(enemy_types)
    return Enemy(
        name=base["name"],
        max_hp=base["max_hp"],
        hp=base["max_hp"],
        attack=base["attack"],
        defense=base["defense"],
        exp=base["exp"],
        gold=base["gold"]
    )

def battle_start(request):
    party_data = request.session.get('party')
    if not party_data:
        return redirect('index')

    party = [Character.from_dict(c) for c in party_data]

    # 敵パーティの生成（最大3体）
    enemy_party = [generate_enemy() for _ in range(random.randint(1, 3))]

    # セッション保存
    request.session['party'] = [c.to_dict() for c in party]
    request.session['enemies'] = [e.to_dict() for e in enemy_party]
    request.session['log'] = ["敵が現れた！"]
    request.session['turn'] = 0  # 行動順番（party + enemyの順）

    return redirect('battle_view')

@require_GET
def battle_view(request):
    party = [Character.from_dict(c) for c in request.session.get('party', [])]
    enemies = [Enemy.from_dict(e) for e in request.session.get('enemies', [])]
    log = request.session.get('log', [])
    turn = request.session.get('turn', 0)

    all_combatants = party + enemies
    alive_combatants = [c for c in all_combatants if c.hp > 0]

    # ✅ 敵のターンだった場合は、自動でバトル処理を行う
    if not alive_combatants:
        log.append("戦闘終了！")
        return redirect('main_menu')
    
    acting = alive_combatants[turn % len(alive_combatants)]

    if isinstance(acting, Enemy):
        return redirect('battle_action')

    # ✅ プレイヤーのターン：テンプレートを表示
    return render(request, 'game/battle.html', {
        'party': party,
        'enemies': enemies,
        'log': log,
        'turn': turn,
        'acting': acting.to_dict(),
        'is_player_turn': isinstance(acting, Character),
    })


@require_GET
def battle_action(request):
    action = request.GET.get('action')
    skill_index = request.GET.get('skill')  # スキル番号（任意）

    party = [Character.from_dict(c) for c in request.session.get('party', [])]
    enemies = [Enemy.from_dict(e) for e in request.session.get('enemies', [])]
    log = request.session.get('log', [])
    turn = request.session.get('turn', 0)

    all_combatants = party + enemies
    acting = all_combatants[turn % len(all_combatants)]

    if isinstance(acting, Character) and acting.hp > 0:
        # プレイヤー側のターン
        if action == 'attack':
            target = next((e for e in enemies if e.hp > 0), None)
            if target:
                damage = max(acting.attack - target.defense, 1)
                target.hp = max(target.hp - damage, 0)
                log.append(f"{acting.name} の攻撃！ {target.name} に {damage} ダメージ！")
        elif action == 'skill' and skill_index is not None:
            try:
                skill = acting.skills[int(skill_index)]
                if skill.type == 'heal':
                    log.append(skill.use(acting, acting))
                else:
                    target = next((e for e in enemies if e.hp > 0), None)
                    if target:
                        log.append(skill.use(acting, target))
            except (IndexError, ValueError):
                log.append("スキルが選択できませんでした。")
        else:
            log.append(f"{acting.name} は何もしなかった…")
    elif isinstance(acting, Enemy) and acting.hp > 0:
        # 敵のターン（ランダムで生きている味方を攻撃）
        target = random.choice([c for c in party if c.hp > 0])
        damage = max(acting.attack - target.defense, 1)
        target.hp = max(target.hp - damage, 0)
        log.append(f"{acting.name} の攻撃！ {target.name} に {damage} ダメージ！")

    # 勝敗チェック
    if all(e.hp <= 0 for e in enemies):
        log.append("敵をすべて倒した！")
        for member in party:
            member.exp += 10
            log.extend(member.level_up_check())
        request.session['party'] = [c.to_dict() for c in party]
        return redirect('main_menu')

    if all(c.hp <= 0 for c in party):
        log.append("パーティは全滅した…")
        return redirect('index')

    # 状態更新と次ターンへ
    request.session['party'] = [c.to_dict() for c in party]
    request.session['enemies'] = [e.to_dict() for e in enemies]
    request.session['log'] = log
    alive_combatants = [c for c in party + enemies if c.hp > 0]
    request.session['turn'] = (turn + 1) % len(alive_combatants)

    return redirect('battle_view')