# game/views/menu.py
from django.shortcuts import render, redirect
from game.models import Character

def main_menu(request):
    party_data = request.session.get('party')
    if not party_data:
        return redirect('index')

    party = [Character.from_dict(c) for c in party_data]
    log = request.session.get('log', [])

    return render(request, 'game/menu.html', {
        'party': party,
        'log': log,
    })

def rest_party(request):
    party_data = request.session.get('party')
    if not party_data:
        return redirect('index')

    party = []
    log = []

    for c in party_data:
        char = Character.from_dict(c)
        char.hp = char.max_hp
        char.mp = char.max_mp
        party.append(char)
        log.append(f"{char.name} は休憩して HP と MP を全回復した！")

    request.session['party'] = [c.to_dict() for c in party]
    request.session['log'] = log
    return redirect('main_menu')
