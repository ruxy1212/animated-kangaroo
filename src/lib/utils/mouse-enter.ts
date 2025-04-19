const letters = "!ABCDEFGHIJKLMNOPQRSTUVWXYZ#";

export const handleMouseEnter = (event: React.MouseEvent<HTMLElement>) => {
  if (!event) return;
  const element = event.target as HTMLDivElement;
  let iteration: number = 0;
  const speed: number = element.dataset.value!.length > 7 ? 30 : 60;

  let lastTimestamp: number;
  let animationFrameId: number | null;

  const animate = (timestamp: number) => {
    if (!lastTimestamp) {
      lastTimestamp = timestamp;
    }

    const deltaTime = timestamp - lastTimestamp;

    if (deltaTime >= speed) {
      element!.textContent! = [...element!.textContent!]
        .map((_: string, index: number) => {
          if (index < iteration) {
            return element.dataset.value![index];
          }

          return letters[Math.floor(Math.random() * letters.length)];
        })
        .join("");

      if (iteration >= element.dataset.value!.length) {
        return;
      }

      iteration += 1 / 3;
      lastTimestamp = timestamp;
    }

    animationFrameId = requestAnimationFrame(animate);
  };

  cancelAnimationFrame(animationFrameId!);
  animationFrameId = requestAnimationFrame(animate);
};