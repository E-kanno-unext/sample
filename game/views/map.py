# game/views/map.py
from django.shortcuts import render, redirect
from game.models import Character, Enemy
import random

def map_view(request):
    party_data = request.session.get('party')
    if not party_data:
        return redirect('index')

    log = request.session.get('log', [])
    return render(request, 'game/map.html', {
        'log': log,
    })

def explore_action(request):
    party_data = request.session.get('party')
    if not party_data:
        return redirect('index')

    party = [Character.from_dict(c) for c in party_data]
    log = request.session.get('log', [])

    encounter_rate = 0.5
    if random.random() < encounter_rate:
        # 敵と遭遇した場合
        return redirect('battle_start')
    else:
        gold_found = random.randint(1, 10)
        log.append(f"探索中に {gold_found} G を見つけた！")
        for member in party:
            member.exp += 1
        request.session['party'] = [c.to_dict() for c in party]
        request.session['log'] = log
        return redirect('map_view')
