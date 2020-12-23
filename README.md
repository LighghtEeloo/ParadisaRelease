# Paradisa

[![Version](https://img.shields.io/badge/Version-1.0.0-success.svg)](http://focs.ji.sjtu.edu.cn:2143/projects/team-18/repository)
[![Status](https://img.shields.io/badge/Status-Release-success.svg)](http://focs.ji.sjtu.edu.cn:2143/projects/team-18/repository)

*Paradisa* is the heroine's a girls' name. 

> According to *thinkbabynames.com*,
>
> > *Paradisa* is of Greek origin, and the meaning of Paradisa is "garden, orchard". Paradise is the ancient term for the home of the blessed. It refers to the Garden of Eden in the Old Testament and heaven in the New Testament.
>
> The character imagines her house as a wonderland, or, paradise. The title is also implying her paranoia.

## Table of Contents
- [Background](#Story)
- [Install](#Install)
- [Usage](#Usage)
- [Contributors](#Contributors)

## Story

### Idea

- The house is a big palace.

- My house is a big palace, with caves, zoos, forests and Antic Ocean, where I eat, I practice, I wash. 

- The house is a big palace, with a dark shadow in the deep, howling from time to time.

- My house is a big palace, without a proper exit.

- ...

The story is about the expedition of a paranoid girl called Paradisa in her own house, with her loving kitty.
Though her aim is to do the most daily and normal things, she imagined them as fantasy. Her mother has gone,
and her father is who she afraid of. The only one she can rely on is her cat. So what would happen in this normal day? 

### Content

Paradisa is a typical puzzle-solving side scroller with multiple levels.
For each level, the little girl is aiming at reaching a particular position on the scene and collect
the particular "key item". There are hidden items in some levels, which means the item that is not in
the right path to reach the goal, but may be discovered by careful players. The cat is the companion
and the guidance of the little girl, who resembles the doll that mom left, and a metaphor for mom.
After four levels of collecting, the little girl would come to the final stage, in which she is chased
by a dark shadow, her father. She needs to run higher and higher onto the tower until she falls.

### Mechanism

Although Paradisa is a one-player game, there are two characters in the scene, the little girl and a cat, and 
player can control either the cat or the girl with `← ↑ → ↓` or `A W D S`, and use `C` to change the character.
The little girl can only walk towards `left` or `right`, she will walk when an instruction is given,
and she won't stop until she reaches the end or boundary. Though the cat can freely walk around the scene,
it is not high enough or heavy enough for some objects, so it has to be cradled by the little girl to pass through.
Two characters must get to the target place together and collect the key item to pass the level.
Some hidden items along the way would influence the ending players reach.

### Levels

#### 1. Menu

2D map on the house, available to choose the level

#### 2. Living room (zoo) - green and yellow

*For tutorial* 

key: TV remote control

#### 3. Bedroom (cloud and amusement park) - pink and white

key: pillow

hidden: cat doll given by mom

#### 4. Bathroom (ocean/aquarium) - blue and black

key: toothbrush

#### 5. Storeroom (cave) - black and yellow

key: violin

hidden: music box as a gift from father

#### 6. Balcony (tower) - gray

Father (black shadowed slime chasing beneath)

Choose routine and quickly climb up the tower

To the highest place: 
- The girl would jump from the tower if no hidden item found
- Otherwise, father would become human and they would hug each other.

## Install

Will be updated in later version.

## Usage

- Global:
    - **Pause**: `SAPCE`
    - **Interact**: `E`
    - **God** mode: `G`
    - **Skip** the level: `P`
    - **Restart** the level: `R`
- Cat:
    - Jump: `↑` or `W`
    - Move Left: `←` or `A`
    - Move Right: `→` or `D`
    - Change control to *Girl*: **HOLD** `C`
- Girl:
    - Ladder Up: `↑` or `W`
    - Ladder Up: `↓` or `S`
    - Move Left: `←` or `A`
    - Move Right: `→` or `D`
    - Change control to *Cat*: **RELEASE** `C`

## Contributors
- Rundong Tang
- Yuchen Jiang
- Yuchen Zhou
- Zhimin Sun
