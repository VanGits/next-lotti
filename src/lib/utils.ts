// Function to navigate to the next page
export const showNextPage = (
  currentPageIndex: number,
  setCurrentPageIndex: (index: number) => void
) => {
  const pages = document.querySelectorAll(".page");
  if (pages && currentPageIndex < pages.length - 1) {
    pages[currentPageIndex].classList.remove("active-next");
    pages[currentPageIndex].classList.add("exit-left");

    setTimeout(() => {
      setCurrentPageIndex(currentPageIndex + 1);
      pages[currentPageIndex + 1].classList.add("active-next");
      pages[currentPageIndex + 1].classList.remove("exit-right", "exit-left");
    }, 150);
  }
};

// Function to navigate to the previous page
export const showPrevPage = (
  currentPageIndex: number,
  setCurrentPageIndex: (index: number) => void
) => {
  const pages = document.querySelectorAll(".page");
  if (pages && currentPageIndex > 0) {
    pages[currentPageIndex].classList.remove("active-next");
    pages[currentPageIndex].classList.add("exit-right");

    setTimeout(() => {
      setCurrentPageIndex(currentPageIndex - 1);
      pages[currentPageIndex - 1].classList.add("active-next");
      pages[currentPageIndex - 1].classList.remove("exit-left", "exit-right");
    }, 150);
  }
};

// Function to navigate to any page
export const navigateToPage = (
  targetIndex: number,
  currentPageIndex: number,
  setCurrentPageIndex: (index: number) => void
) => {
  const pages = document.querySelectorAll(".page");
  if (
    pages &&
    targetIndex >= 0 &&
    targetIndex < pages.length &&
    targetIndex !== currentPageIndex
  ) {
    const isForward = targetIndex > currentPageIndex;
    pages[currentPageIndex].classList.remove("active-next");
    pages[currentPageIndex].classList.add(
      isForward ? "exit-left" : "exit-right"
    );

    setTimeout(() => {
      setCurrentPageIndex(targetIndex);
      pages[targetIndex].classList.add("active-next");
      pages[targetIndex].classList.remove("exit-left", "exit-right");
    }, 150);
  }
};