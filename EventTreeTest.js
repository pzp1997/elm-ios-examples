// TODO make tagger have 0 descendentsCount


var __2_TAGGER = 'tagger';
var __2_THUNK = 'thunk';
var __2_LEAF = 'leaf';
var __2_PARENT = 'parent';

// Helper stuff

function F2(fun) {
  function wrapper(a) {
    return function(b) {
      return fun(a, b);
    };
  }
  wrapper.arity = 2;
  wrapper.func = fun;
  return wrapper;
}

var _elm_lang$core$Native_List = function() {
  var Nil = {
    ctor: '[]'
  };

  function Cons(hd, tl) {
    return {
      ctor: '::',
      _0: hd,
      _1: tl
    };
  }

  function toArray(xs) {
    var out = [];
    while (xs.ctor !== '[]') {
      out.push(xs._0);
      xs = xs._1;
    }
    return out;
  }

  function fromArray(arr) {
    var out = Nil;
    for (var i = arr.length; i--;) {
      out = Cons(arr[i], out);
    }
    return out;
  }

  return {
    toArray: toArray,
    fromArray: fromArray
  };
}();


var YOGA_KEY = 'YOGA';
var EVENT_KEY = 'EVENT';

function leaf(tag, factList) {
  return {
    $: __2_LEAF,
    __tag: tag,
    __facts: organizeFacts(factList)
  }
}

function parent(factList, kidList) {
  var children = [];
  var descendantsCount = 0;
  while (kidList.ctor !== '[]') {
    var kid = kidList._0;
    descendantsCount += (kid.descendantsCount || 0);
    children.push(kid);
    kidList = kidList._1;
  }
  descendantsCount += children.length;

  return {
    $: __2_PARENT,
    __facts: organizeFacts(factList),
    __kids: children,
    __descendantsCount: descendantsCount
  };
}

function organizeFacts(factList) {
  var facts = {};

  while (factList.ctor !== '[]') {
    var entry = factList._0;
    var key = entry.key;

    if (key === YOGA_KEY || key === EVENT_KEY) {
      var subFacts = facts[key] || {};
      subFacts[entry.realKey] = entry.value;
      facts[key] = subFacts;
    } else {
      facts[key] = entry.value;
    }

    factList = factList._1;
  }

  return facts;
}


function map(tagger, node) {
  return {
    $: __2_TAGGER,
    __tagger: tagger,
    __node: node,
    __descendantsCount: 0
  };
}


function on(name, decoder) {
  return {
    key: EVENT_KEY,
    realKey: name,
    value: decoder
  };
}

function makeEventNode(func, offset) {
  return {
    __func: func,
    __offset: offset,
    __handlerListHd: undefined,
    __handlerListTl: undefined,
    __kidListHd: undefined,
    __kidListTl: undefined,
    __parent: undefined,
    __next: undefined
  }
}

function makeEventLeaf(handlers, offset) {
  return {
    __funcs: handlers,
    __offset: offset,
    __parent: undefined,
    __next: undefined
  };
}

function buildEventTree(vNode, offset, eventNode) {
  switch (vNode.$) {
    case __2_TAGGER:
      var newEventNode = makeEventNode(vNode.__tagger, offset);
      buildEventTree(vNode.__node, 0, newEventNode);

      newEventNode.__parent = eventNode;

      if (typeof eventNode.__kidListTl !== 'undefined') {
        eventNode.__kidListTl.__next = newEventNode;
      } else {
        eventNode.__kidListHd = newEventNode;
      }
      eventNode.__kidListTl = newEventNode;
      break;

    case __2_THUNK:
      buildEventTree(vNode.__node, offset, eventNode);
      break;

    case __2_LEAF:
      addHandlers(vNode, offset, eventNode);
      break;

    case __2_PARENT:
      addHandlers(vNode, offset, eventNode);
      var kids = vNode.__kids;
      for (var i = 0; i < kids.length; i++) {
        var kid = kids[i];
        buildEventTree(kid, ++offset, eventNode);
        offset += kid.__descendantsCount || 0;
      }
      break;
  }
}

function addHandlers(vNode, offset, eventNode) {
  var handlers = vNode.__facts[EVENT_KEY];
  if (typeof handlers !== 'undefined') {
    var newTail = makeEventLeaf(handlers, offset);
    newTail.__parent = eventNode;

    if (typeof eventNode.__handlerListTl !== 'undefined') {
      eventNode.__handlerListTl.__next = newTail;
    } else {
      eventNode.__handlerListHd = newTail;
    }
    eventNode.__handlerListTl = newTail;
  }
}

// build example tree
//
//    o
//    |
// . MAP o
//  \ | /
//    o
//    |
//   MAP
//    |
//   ROOT

var clickHandler = on('click', function(e) {});
var dblClickHandler = on('dblClick', function(e) {});
var tripleClickHandler = on('tripleClick', function(e) {});

var fromArray = _elm_lang$core$Native_List.fromArray;

var vBranch = parent(fromArray([]), fromArray([
  leaf('label', fromArray([])),
  map(function(e) {}, leaf('button', fromArray([tripleClickHandler]))),
  leaf('image', fromArray([dblClickHandler]))
]));

var vTree = map(function(e) {}, parent(fromArray([clickHandler]), fromArray([vBranch])));

var eventTree = makeEventNode(console.log, 0);
buildEventTree(vTree, 0, eventTree);
