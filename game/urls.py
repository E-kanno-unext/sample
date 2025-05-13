# game/urls.py
from django.urls import path
from game.views import (
    prologue,
    menu,
    battle,
    map,
    exploration,
)

urlpatterns = [
    path('', prologue.index, name='index'),
    path('start/', prologue.init_game, name='init_game'),
    path('main/', menu.main_menu, name='main_menu'),
    path('party/rest/', menu.rest_party, name='rest_party'),
    
    path('battle/start/', battle.battle_start, name='battle_start'),
    path('battle/', battle.battle_view, name='battle_view'),
    path('battle/action/', battle.battle_action, name='battle_action'),

    path('map/', map.map_view, name='map_view'),
    path('map/explore/', map.explore_action, name='explore_action'),

    path('map/<str:area>/', exploration.map_view, name='map_view'),
    # path('map/event', exploration.map_event, name='map_event'),
]
