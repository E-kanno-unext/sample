# game/views/prologue.py
from django.shortcuts import render, redirect
from game.models import Character, Skill
import random

def index(request):
    return render(request, 'game/index.html')

def init_game(request):
    if request.method == 'POST':
        name = request.POST.get('name', '主人公')
        # 主人公の初期化
        hero = Character(
            name=name,
            max_hp=100,
            hp=100,
            mp=30,
            max_mp=30,
            attack=10,
            defense=5,
            magic=8,
            level=1,
            exp=0,
            skills=[
                Skill(name="ファイア", power=20, mp_cost=5, type="attack"),
                Skill(name="ヒール", power=15, mp_cost=4, type="heal")
            ]
        )

        # 仲間の初期化
        ally1 = Character(
            name="剣士カイン",
            max_hp=90,
            hp=90,
            mp=10,
            max_mp=10,
            attack=15,
            defense=8,
            magic=2,
            level=1,
            exp=0,
            skills=[Skill(name="斬撃", power=18, mp_cost=3, type="attack")]
        )
        ally2 = Character(
            name="魔導士リナ",
            max_hp=60,
            hp=60,
            mp=40,
            max_mp=40,
            attack=5,
            defense=4,
            magic=12,
            level=1,
            exp=0,
            skills=[
                Skill(name="アイス", power=22, mp_cost=6, type="attack"),
                Skill(name="大ヒール", power=25, mp_cost=8, type="heal")
            ]
        )

        # パーティとしてセッションに保存
        party = [hero, ally1, ally2]
        request.session['party'] = [c.to_dict() for c in party]
        request.session['log'] = [f"{name} の冒険が始まった！"]

        return redirect('main_menu')

    return redirect('index')
