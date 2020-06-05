export const fireEvent = (name: string, entry: any) => {
  const event = new CustomEvent(name, {
    bubbles: true,
    detail: entry,
  });

  document.dispatchEvent(event);
};
