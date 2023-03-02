import { useRef, useEffect, useCallback } from "react";
import throttle from "lodash/throttle";

const windowScrollPositionKey = {
  y: "pageYOffset",
  x: "pageXOffset",
};
const documentScrollPositionKey = {
  y: "scrollTop",
  x: "scrollLeft",
};

const getScrollPosition = function getScrollPosition(axis) {
  return (
    window[windowScrollPositionKey[axis]] ||
    document.documentElement[documentScrollPositionKey[axis]] ||
    document.body[documentScrollPositionKey[axis]] ||
    0
  );
};

const ReactWindowScroller = function ReactWindowScroller(_ref) {
  const children = _ref.children,
    _ref$throttleTime = _ref.throttleTime,
    throttleTime = _ref$throttleTime === void 0 ? 10 : _ref$throttleTime,
    _ref$isGrid = _ref.isGrid,
    isGrid = _ref$isGrid === void 0 ? false : _ref$isGrid;
  const ref = useRef();
  const outerRef = useRef();
  useEffect(
    function () {
      const handleWindowScroll = throttle(function () {
        const _ref2 = outerRef.current || {},
          _ref2$offsetTop = _ref2.offsetTop,
          offsetTop = _ref2$offsetTop === void 0 ? 0 : _ref2$offsetTop,
          _ref2$offsetLeft = _ref2.offsetLeft,
          offsetLeft = _ref2$offsetLeft === void 0 ? 0 : _ref2$offsetLeft;

        const scrollTop = getScrollPosition("y") - offsetTop;
        const scrollLeft = getScrollPosition("x") - offsetLeft;
        if (isGrid)
          ref.current &&
            ref.current.scrollTo({
              scrollLeft: scrollLeft,
              scrollTop: scrollTop,
            });
        if (!isGrid) ref.current && ref.current.scrollTo(scrollTop);
      }, throttleTime);
      window.addEventListener("scroll", handleWindowScroll);
      return function () {
        handleWindowScroll.cancel();
        window.removeEventListener("scroll", handleWindowScroll);
      };
    },
    [isGrid, throttleTime]
  );
  const onScroll = useCallback(
    function (_ref3) {
      let scrollLeft = _ref3.scrollLeft,
        scrollTop = _ref3.scrollTop,
        scrollOffset = _ref3.scrollOffset,
        scrollUpdateWasRequested = _ref3.scrollUpdateWasRequested;
      if (!scrollUpdateWasRequested) return;
      if (!scrollUpdateWasRequested) return;
      const top = getScrollPosition("y");
      const left = getScrollPosition("x");

      const _ref4 = outerRef.current || {},
        _ref4$offsetTop = _ref4.offsetTop,
        offsetTop = _ref4$offsetTop === void 0 ? 0 : _ref4$offsetTop,
        _ref4$offsetLeft = _ref4.offsetLeft,
        offsetLeft = _ref4$offsetLeft === void 0 ? 0 : _ref4$offsetLeft;

      scrollOffset += Math.min(top, offsetTop);
      scrollTop += Math.min(top, offsetTop);
      scrollLeft += Math.min(left, offsetLeft);
      if (!isGrid && scrollOffset !== top) window.scrollTo(0, scrollOffset);

      if (isGrid && (scrollTop !== top || scrollLeft !== left)) {
        window.scrollTo(scrollLeft, scrollTop);
      }
    },
    [isGrid]
  );
  return children({
    ref: ref,
    outerRef: outerRef,
    style: {
      width: isGrid ? "auto" : "100%",
      height: "100%",
      display: "inline-block",
    },
    onScroll: onScroll,
  });
};

export { ReactWindowScroller };
