import React, { useEffect } from "react";
import Trail from "@/lib/follow/Trail";
import styled from "styled-components";

export interface MouseTrailProps extends React.ComponentPropsWithRef<"div"> {
  color?: string;
  id?: string;
  idleAnimation?: boolean;
  idleAnimationCount?: number;
  size?: number;
  trailCount?: number;
}
interface StyledTrailProps {
  size?: number;
  color?: string;
}

const TrailContainer = styled.div<StyledTrailProps>`
  position: absolute;
  pointer-events: none;
  top: 0;
  left: 0;
  z-index: 9999;
  border-radius: 0;
  mix-blend-mode: difference;

  span {
    position: absolute;
    display: block;
    border-radius: 100%;
    transform-origin: center;
    transition: transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    width: ${({ size }: MouseTrailProps) => size}px;
    height: ${({ size }: MouseTrailProps) => size}px;
    background-color: #fff;
  }
`;

const CursorFollow: React.FC<MouseTrailProps> = ({
  color = "#fff",
  id = "react-mouse-trail",
  idleAnimation = false,
  idleAnimationCount = 5,
  size = 14,
  trailCount = 10,
  ...props
}) => {
  const trails: Trail[] = [];
  const mousePosition = {
    x: 0,
    y: 0,
  };
  let animationId: number;
  let timer: ReturnType<typeof setTimeout>;
  let isIdle = false;
  let lastClientX = 0;
  let lastClientY = 0;

  const draw = (): void => {
    let { x, y } = mousePosition;
    trails.forEach((trail, index, trails) => {
      const nextTrail = trails[index + 1] || trails[0];

      trail.x += (x - trail.x) * (1 - 0.6);
      trail.y += (y - trail.y) * (1 - 0.6);
      trail.draw(isIdle, idleAnimationCount);

      if (!isIdle || index >= trailCount - idleAnimationCount) {
        x += (nextTrail.x - trail.x) * 0.35;
        y += (nextTrail.y - trail.y) * 0.35;
      }
    });
  };

  const animate = (): void => {
    draw();
    animationId = window.requestAnimationFrame(animate);
  };

  const loadTrailElements = (): void => {
    for (let index = 0; index < trailCount; index++) {
      const trail = new Trail({
        elementId: id,
        idleAnimation,
        index,
        size,
        trailCount,
      });
      trails.push(trail);
    }
  };

  const cursorListener = (event: MouseEvent): void => {
    mousePosition.x = event.pageX;
    mousePosition.y = event.pageY;
    lastClientX = event.clientX;
    lastClientY = event.clientY;
    setIdleAnimations();
  };

  const touchListener = (event: TouchEvent): void => {
    mousePosition.x = event.touches[0].pageX;
    mousePosition.y = event.touches[0].pageY;
    lastClientX = event.touches[0].clientX;
    lastClientY = event.touches[0].clientY;
    setIdleAnimations();
  };

  const scrollListener = (): void => {
    mousePosition.x = lastClientX + window.scrollX;
    mousePosition.y = lastClientY + window.scrollY;
  };

  const setIdleAnimations = (): void => {
    clearTimeout(timer);

    timer = setTimeout(() => {
      isIdle = true;
      for (const trail of trails) trail.lock();
    }, trailCount * 7.5);

    isIdle = false;
  };

  const removeAllChildNodes = (parent?: HTMLElement): void => {
    while (parent?.firstChild) {
      parent?.removeChild(parent?.firstChild);
    }
  };

  useEffect(() => {
    if (window) {
      loadTrailElements();
      window.addEventListener("mousemove", cursorListener);
      window.addEventListener("touchmove", touchListener);
      window.addEventListener("scroll", scrollListener);
      window.addEventListener("wheel", scrollListener);
      animate();
    }

    return () => {
      window.removeEventListener("mousemove", cursorListener);
      window.removeEventListener("touchmove", touchListener);
      window.removeEventListener("scroll", scrollListener);
      window.removeEventListener("wheel", scrollListener);
      window.cancelAnimationFrame(animationId);
      const trailContainer = document.getElementById(id) as HTMLDivElement;
      removeAllChildNodes(trailContainer);
    };
  },);

  return (
    <TrailContainer
      color={color}
      id={id}
      size={size}
      {...props}
    />
  );
};

export default CursorFollow;