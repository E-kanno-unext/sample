from dataclasses import dataclass, field
from typing import List, Dict
import random

@dataclass
class Skill:
    name: str
    power: int
    mp_cost: int
    type: str  # 'attack' or 'heal'

    def use(self, user: 'Character', target: 'Character') -> str:
        if user.mp < self.mp_cost:
            return f"{user.name} は MP が足りない！"
        user.mp -= self.mp_cost
        if self.type == 'attack':
            damage = max(self.power + user.attack - target.defense, 0)
            target.hp = max(target.hp - damage, 0)
            return f"{user.name} の {self.name}！ {target.name} に {damage} ダメージ！"
        elif self.type == 'heal':
            heal_amount = self.power + user.magic
            user.hp = min(user.hp + heal_amount, user.max_hp)
            return f"{user.name} は {self.name} を使って {heal_amount} 回復した！"
        return ""

    def to_dict(self) -> Dict:
        return {
            'name': self.name,
            'power': self.power,
            'mp_cost': self.mp_cost,
            'type': self.type,
        }

    @staticmethod
    def from_dict(data: Dict) -> 'Skill':
        return Skill(
            name=data['name'],
            power=data['power'],
            mp_cost=data['mp_cost'],
            type=data['type']
        )


@dataclass
class Character:
    name: str
    max_hp: int
    hp: int
    mp: int
    max_mp: int
    attack: int
    defense: int
    magic: int
    level: int
    exp: int
    skills: List[Skill] = field(default_factory=list)

    def is_alive(self) -> bool:
        return self.hp > 0

    def level_up_check(self) -> List[str]:
        logs = []
        required_exp = self.level * 10
        while self.exp >= required_exp:
            self.level += 1
            self.max_hp += 10
            self.max_mp += 5
            self.attack += 2
            self.defense += 1
            self.magic += 2
            self.hp = self.max_hp
            self.mp = self.max_mp
            self.exp -= required_exp
            logs.append(f"{self.name} は レベル {self.level} に上がった！")
            required_exp = self.level * 10
        return logs

    def to_dict(self) -> Dict:
        data = self.__dict__.copy()
        data['skills'] = [s.to_dict() for s in self.skills]
        return data

    @staticmethod
    def from_dict(data: Dict) -> 'Character':
        skills = [Skill.from_dict(s) for s in data.get('skills', [])]
        return Character(
            name=data['name'],
            max_hp=data['max_hp'],
            hp=data['hp'],
            mp=data['mp'],
            max_mp=data['max_mp'],
            attack=data['attack'],
            defense=data['defense'],
            magic=data['magic'],
            level=data['level'],
            exp=data['exp'],
            skills=skills
        )


@dataclass
class Enemy:
    name: str
    max_hp: int
    hp: int
    attack: int
    defense: int
    exp: int
    gold: int

    def is_alive(self) -> bool:
        return self.hp > 0

    def to_dict(self) -> Dict:
        return self.__dict__

    @staticmethod
    def from_dict(data: Dict) -> 'Enemy':
        return Enemy(**data)
