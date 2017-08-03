function buildEventTree(vNode, eventNode, offset) {
  switch (vNode.type) {
    case __2_TAGGER:
      var tagger = makeEventNode(vNode.func, eventNode, offset);
      eventNode.__kidList
      buildEventTree(vNode.node, , 0);
      break;
    default:

  }
}

function makeEventNode(func, offset) {
  return {
    __func: func,
    __offset: offset,
    __handlerListHd: undefined,
    __handlerListTl: undefined,
    __parent: undefined,
    __next: undefined
    __kidListHd: undefined,
    __kidListTl: undefined
  };
}

function makeEventLeaf(handlers, offset) {
  return {
    __funcs: handlers,
    __offset: offset,
    __parent: undefined,
    __next: undefined
  };
}


var rootEventNode = makeEventNode(TODO fn to pass to runtime, 0);
buildEventTree(vTree, 0, rootEventNode);

// TODO integrate with pre-render step
function buildEventTree(vNode, offset, eventNode) {
  switch (vNode.type) {
    case __2_TAGGER:
      // create new event node and continue recursing
      var newEventNode = makeEventNode(vNode.func, offset);
      buildEventTree(vNode.node, 0, newEventNode);

      // update parent pointer of new node
      newEventNode.parent = eventNode;

      // add new node to old node's kidList
      if (typeof eventNode.kidListTl !== 'undefined') {
        eventNode.kidListTl.next = newEventNode;
      } else {
        eventNode.kidListHd = newEventNode;
      }
      eventNode.kidListTl = newEventNode;


    case __2_THUNK:
      // keep on moving, don't change the offset
      // TODO make sure that the thunk has already been computed
      buildEventTree(vNode.node, offset, eventNode);
      // return buildEventTree(vNode.node, offset, eventNode);

    case __2_LEAF:
      var events = vNode.facts[EVENT_KEY];
      if (typeof events !== 'undefined') {
        var eventLeaf = makeEventLeaf(events, offset);

        // update parent pointer of leaf
        eventLeaf.parent = eventNode;

        // add leaf to eventNode's handlerList
        if (typeof eventNode.__handlerListTl !== 'undefined') {
          eventNode.__handlerListTl.next = eventLeaf;
        } else {
          eventNode.__handlerListHd = eventLeaf;
        }
        eventNode.__handlerListTl = eventLeaf;

      }
      // return typeof events !== 'undefined' ?
      //   makeEventLeaf(events, offset) : undefined;

    case __2_PARENT:
      // TODO check if parent has an event node

      var kids = vNode.children;
      for (var i = 0; i < kids.length; i++) {
        var kid = kids[i];
        buildEventTree(kid, ++offset, eventNode);

        // var subTree = buildEventTree(kid, ++offset, eventNode);
        //
        // if (typeof subTree !== 'undefined') {
        //   subTree.parent = eventNode;
        //
        //   if (typeof eventNode.kidListTl !== 'undefined') {
        //     eventNode.kidListTl.next = subTree;
        //   } else {
        //     eventNode.kidListHd = subTree;
        //   }
        //   eventNode.kidListTl = subTree;
        //
        // }

        offset += kid.descendentsCount || 0;
      }

  }
}


// TODO add descendentsCount to parent and thunk (same as its node)




function buildEventTree(vNode, offset, eventNode) {
  switch (vNode.type) {
    case __2_TAGGER:
      var newEventNode = makeEventNode(vNode.func, offset);
      buildEventTree(vNode.node, 0, newEventNode);

      newEventNode.parent = eventNode;

      if (typeof eventNode.kidListTl !== 'undefined') {
        eventNode.kidListTl.next = newEventNode;
      } else {
        eventNode.kidListHd = newEventNode;
      }
      eventNode.kidListTl = newEventNode;
      break;

    case __2_THUNK:
      buildEventTree(vNode.node, offset, eventNode);
      break;

    case __2_LEAF:
      addHandlers(vNode, offset, eventNode);
      break;

    case __2_PARENT:
      addHandlers(vNode, offset, eventNode);
      var kids = vNode.children;
      for (var i = 0; i < kids.length; i++) {
        var kid = kids[i];
        buildEventTree(kid, ++offset, eventNode);
        offset += kid.descendantsCount || 0;
      }
      break;
  }
}

function addHandlers(vNode, offset, eventNode) {
  var events = vNode.facts[EVENT_KEY];
  if (typeof events !== 'undefined') {
    var eventLeaf = makeEventLeaf(events, offset);

    eventLeaf.parent = eventNode;

    if (typeof eventNode.__handlerListTl !== 'undefined') {
      eventNode.__handlerListTl.next = eventLeaf;
    } else {
      eventNode.__handlerListHd = eventLeaf;
    }
    eventNode.__handlerListTl = eventLeaf;
  }
}
