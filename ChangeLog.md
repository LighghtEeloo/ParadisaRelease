# Change Log

## Global

2020-07-13 19:47 	Yuchen Jiang

[MVP] #167 Keep readying...

- Minor Change to Changelog (including this one)
- Petting cat.

2020-07-13 19:00 	Zhimin Sun	

[MVP] #167 Ready to release
- Add README
- Add ChangeLog

2020-07-13 19:08	Yuchen Jiang	

[Fix Physics] #167 

- Block is working. Fixed the bug of pushing away the object too far away.
- Removed the softBlock function. It was a stupid idea.
- Right Surround still wrong...

2020-07-13 18:26	Yuchen Jiang	

[Fix] #167 

- Cat Block size fix
- offset in Image
- Pause done

2020-07-13 11:53 	Yuchen Jiang 	

[src TidyUp] #167 
- Tools.elm -> StringTools.elm
- Character.elm removed
- Look.elm tidied

2020-07-13 06:58 	Yuchen Jiang 	

[Makefile] #167 
- make to build
- css working

2020-07-13 01:21 	Yuchen Jiang 	

[Message] #167 
- Message changed to fit in.
- init fixed.
- update fixed.

2020-07-13 00:36 	Yuchen Jiang 	

[Fix] #167 
- Changed Comment Bug
- Update minor fix

2020-07-13 00:20 	Yuchen Jiang 	

[Update Stringed] #167 
- UpdateLogic
- UpdatePhysics
- UpdateVisual

## Elapse

2020-07-13 09:00 	Yuchen Jiang
	
[Elapse v1 1/1] #167 
- elapse based physics
- elapse based visualization

2020-07-13 07:15 	Yuchen Jiang 		

[Elapse v0 1/1] #167 
- added elapse to slow down animation.
- dummy -> default in Model.elm

## Resize

2020-07-12 15:01 	Yuchen Jiang 	

[Resize v0 2/2] #375 Main changed.
- Resize failing from js side.
- Used % in all view.

2020-07-12 01:38 	Yuchen Jiang 	

[Resize v0 1/2] #375
- Try Stopping resizing. Test needed.
- .gitignore updated.

## Images

2020-07-12 23:28 	Yuchen Zhou 	

[Images v0 2/2] #248 
- Reality in Level1

2020-07-12 01:17 	Yuchen Zhou

[Images v0 1/2] #248
- images of level1

## Operation

2020-07-11 20:49 	Yuchen Jiang 

[Operation] #167 
- type Control in GameModel changed.

## Logic

2020-07-12 00:56 	Zhimin Sun 	

[Logic v1 1/1] #260 Update functions & related

- New functions: Use Msg to generate status.
- Delete the Operation type, edit the status in "CatGirl.elm".

2020-07-10 16:53 	Zhimin Sun 	

[Logic v0 1/1] #260 Update functions & related
- Complete update function: Use Msg to generate Operation.
- Rewrite the Operation type.
- Add new key for `restart` and `skip`.

## Key


2020-07-10 09:36 	Yuchen Jiang 	
[Key v0 2/2] #167 Add Operation.

2020-07-10 00:25 	Yuchen Jiang 	
[Key v0 1/2] #167 Add key.

## View

2020-07-13 05:01 	Yuchen Jiang 	

[View] #167 
- new View function
- Flipping cat
- CatWalk operational.
- Todo: CatJump
- index.js fix

2020-07-13 01:28 	Rundong Tang 	

visualize level 1 images

2020-07-13 01:04 	Yuchen Jiang 	

[Artwork] #167 
- Move images.

2020-07-13 00:45 	Yuchen Zhou 
	
[Visual] #191 ViewInit changes.

2020-07-13 00:42 	Rundong Tang 	

[View] #167 
- add the vlzImg function to View
- View localized

2020-07-13 00:39 	Rundong Tang 	

[View] #167 
- add the vlzImg function to View

2020-07-13 00:28 	Yuchen Jiang 	

[Visualization Fix] #191 
- Changed CatStatus
- Fixed type alteration

2020-07-12 01:17 	Yuchen Zhou 	

[Visualization] #191 

- Link it with URLs.
- Add view-init for Model.elm
- Change the name of some pictures.
- Fix ladder for "List Image".

2020-07-12 00:16 	Rundong Tang 	

[View] #261 add the vlzImg function to View

2020-07-11 11:19 	Yuchen Zhou 	

[Visual] #191 Visualization Sketch done!
- VisualCat and VisualGirl done.
- Visualization done.
- VisualStatic separated.

2020-07-10 14:14 	Rundong Tang 
	
[View] #261 frame of View

2020-07-10 04:52 	Yuchen Zhou

[Visual] #191 
- imageLoop
- transmitSize
- Orientation

2020-07-09 20:48 	Yuchen Zhou

[View Model] # 191
- Add some link from status to images
- Add many images
- Need sync with gameModel

## Physics

2020-07-12 20:19 	Yuchen Jiang 	

[Physics v0 9/9] #189 
- updatePhysics completed!
- just an MVP implement.
- Used block thinking. Next stage is lining them.

2020-07-12 20:19 	Yuchen Jiang 	

[Physics v0 8/9] #189 Accelerate
- Accelerate complete
- ClearAccelerate complete.
- Ready to upadtePhysics.

2020-07-11 21:18 	Yuchen Jiang 	

[Physics v0 7/9] #189 
- updatePhysics halfway

2020-07-11 15:50 	Yuchen Jiang 	

[Physics v0 6/9] #189 Accelerate
- Accelerate complete
- ClearAccelerate complete.
- Ready to upadtePhysics.

2020-07-11 12:34 	Yuchen Jiang 	

[Physics v0 5/9] #189 Collide
- Use Collide to do collision
- Next is to Accelerate

2020-07-11 09:00 	Yuchen Jiang 	

[Physics v0 4/9] #189 Tidy up Types.
- Sort block-related functions into PhysicsTypes.elm

2020-07-11 07:56 	Yuchen Jiang 	

[Physics v0 3/9] #189 Blocks.
- the idea of soft blocks.
- surrounding blocks.
- basic functions about blocks.

2020-07-10 00:25 	Yuchen Jiang 	

[Physics v0 2/9] #189 GameModel change. Master merge wait.

2020-07-09 22:54 	Yuchen Jiang

[Physics v0 1/9] #189 GameModel change. Master merge wait.

## Annotator

2020-07-07 19:44 	Yuchen Zhou 	

[Annotator v0 1/1] See Test.elm.

## Character

2020-07-07 22:21 	Zhimin Sun

[Character v0 2/2] Add character view

2020-07-07 19:37 	Yuchen Zhou

[Character v0 1/2] Walking Cat

## Framework

2020-07-10 02:28 	Yuchen Zhou 	

[Framework v1 12/12] #167 Physics prepare
- Fixed physics.
- VisualType split.
- Change the Resize and GetViewPort :-)

2020-07-09 22:05 	Yuchen Jiang

[Framework v1 11/12] #167 

- BasicTypes.elm: structural change. Physics prepare.

2020-07-09 22:05 	Yuchen Jiang

[Framework v1 10/12] #167 New Test.

2020-07-09 17:19 	Yuchen Jiang 	

[Framework v1 9/12] BasicTypes.elm: structural change. Physics prepare.

2020-07-09 17:19 	Yuchen Jiang 	

[Framework v1 8/12] New Test.

2020-07-08 23:59 	Yuchen Jiang 	

[Framework v1 7/12] BasicTypes.elm: structural change. Physics prepare.

2020-07-08 19:20 	Yuchen Jiang 	

[Framework v1 6/12] New Test.

2020-07-08 19:00 	Yuchen Jiang 
	
[Framework v1 5/12] BasicTypes.elm: structural change. Physics prepare.

2020-07-07 12:53 	Yuchen Jiang 
	
[Framework v1 4/12] Level structure completed. Layer-divided work can proceed now.

2020-07-07 12:45 	Yuchen Jiang 	

[Framework v1 3/12] Level system in int, viewModel / gameModel separated.

2020-07-07 12:44 	Yuchen Jiang 	

[Framework v1 2/12] KeyCode, Ani updated, Arcade removed.

2020-07-07 12:44 	Zhimin Sun 	

[Framework v1 1/12] Optimize the model

2020-07-07 12:44 	Yuchen Jiang

[Framework v0 2/2] Init the Main and build up the frame.

2020-07-07 12:43 	Zhimin Sun

[Framework v0 1/2] Setup the frame