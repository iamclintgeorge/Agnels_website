export const carouselController = (req, res) => {
  const { altText, image } = req.body;
  console.log(altText, image);

  // const images = [
  //   { url: "/images/campus1.png", alt: "Campus View 1" },
  //   { url: "/images/campus2.png", alt: "Campus View 2" },
  //   { url: "/images/campus3.png", alt: "Campus View 3" },
  //   { url: "/images/campus4.png", alt: "Campus View 4" },
  // ];
  // return res.json(images);
};
