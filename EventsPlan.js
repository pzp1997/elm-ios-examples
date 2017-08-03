// ignore period nodes, just filler to keep structure

var eventTree = {
    __func: func, // Event -> Event
    __offset: offset, // From the nearest MAP node parent / "domainating". Reset offset only for descendents of MAP nodes.
    __kid1: null, // Only MAP nodes have kids. Direct MAP descendents ignoring the filler nodes and event nodes.
    __kidN: null,
    __leaf1: null, // Direct event node descendents ignoring fillers. Only MAP nodes will have them.
    __leafN: null,
    __newKid1: null, // All non-filler local descendents of MAP node.
    __newKid2: null,
    __parent: null, // The direct MAP node parent. Everyone except ROOT.
    __next: null // The next MAP node. Linked list of siblings.
}


type alias AtEventNode =
  { index: Int
  , listeners: List ListenerEventNode
  , maps: List MapEventNode
  , parent: EventNode
  }


type alias MapEventNode =
  { func: Event -> Event
  , parent: EventNode
  }


type alias ListenerEventNode =
  { listeners: Dict String (Event -> Event)
  , parent: EventNode
  }


type EventNode
  = EventAt AtEventNode
  | MapEvent MapEventNode
  | Listener ListenerEventNode


var mapNode = {
  __func: func,
  __parent: null,
  __next: null,
  __headChild: null,
  __tailChild: null
}

{
  funcs: [eventName: eventHandler], // [String: Event -> Event]
  offset: Int,
  parent: null,
  next: null // Perhaps another leaf
}





kid1 -> null
kidN ->

offsetDelta += oldMap.eventDescendentCount
leaf1 -> {2+1} -> {2+offsetDelta} -> null
leafN ->

.  o  .
 \ | /
   .   o  .
     \ | /
      MAP   MAP
       |    /
       .  MAP
        \ /
         .
         |
        ROOT

MAP can have only one direct child


1  2  3
 \ | /
   0   4  5
     \ | /
       3     0
       |    /
       2   4
        \ /
         1
         |
         0




.  o  .
 \ | /
   .  o  .
    \ | /
      .
      |
     MAP
      |
     ROOT


2  3  4
 \ | /
   1  5  6
    \ | /
      0
      |
      1
      |
      0

ROOT = {
  func: ...,
  offset: 0,
  handlerListHd: undefined,
  handlerListTl: undefined,
  parent: undefined,
  next: undefined,
  kidListHd: MAP,
  kidListTl: MAP
}

MAP = {
  func: ...,
  offset: 1,
  handlerListHd: o(3),
  handlerListTl: o(5),
  parent: ROOT,
  next: undefined,
  kidListHd: undefined,
  kidListTl: undefined
}

o(3) = {
  __funcs: ...,
  __offset: 3,
  __parent: MAP,
  __next: o(5)
}

o(5) = {
  __funcs: ...,
  __offset: 5,
  __parent: MAP,
  __next: undefined
}

  o(3) -> o(5)
  |     /
  |    /
 MAP(1)
  |
 ROOT(0)


// In Swift, Event -> ()

// JS function exposed in Swift

function onTouch(event)
{
    var realFunc = onTouch.__pointer_into_event_tree
    realFunc(event)
}
onTouch.__pointer_into_event_tree = eventLeaf


createEventHandler
function onTouch(event)
{
    var leaf = onTouch.__pointer_into_event_tree
    event = leaf['touch'](event)
    while (leaf.__parent)
    {
        leaf = leaf.__parent;
        event = leaf.__func(event);
    }
}
onTouch.__pointer_into_event_tree = leaf;


Sorry to bother you. I’ve been working on the events problem today and a thought occurred to me. Could we model the event tree in a similar way to the new patch tree. Each `At` node can store the index of the corresponding UIKit node in its parent’s children array, a pointer to its parent in the event tree,








case __2_TAGGER:
    while (x.__child.$ === __2_TAGGER) {
        x = x.__child;
    }

    y.__parent = eventNode;
    while (y.__child.$ === __2_TAGGER) {
        y.__child.__parent = y;
        y = y.__child;
    }

    x.__func = y.__func;
    x.__child = y.__child;
    x.__parent = y.__parent;
    diffHelp(x.__child, y.__child, y, ...);
    return;
