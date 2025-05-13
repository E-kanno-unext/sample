# game/views/exploration.py
from django.shortcuts import render
from django.views.decorators.http import require_GET

@require_GET
def map_view(request, area):
    """
    エリア別マップ表示（town / village / dungeon など）
    """
    valid_areas = ["town", "village", "dungeon"]
    if area not in valid_areas:
        area = "town"  # デフォルト

    context = {
        "area": area,  # テンプレートに渡す
    }
    return render(request, 'game/map.html', context)
