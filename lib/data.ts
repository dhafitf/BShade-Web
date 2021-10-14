import fs from "fs";
import path from "path";
import matter from "gray-matter";

const HTMLDirectory = path.join(process.cwd(), "HTML");
const CSSDirectory = path.join(process.cwd(), "CSS");

export function getHTML() {
  const HMTL = fs.readdirSync(HTMLDirectory);

  return HMTL.map((filename) => {
    const permalink = filename.replace(".md", "");
    const fileContent = fs.readFileSync(
      path.join(HTMLDirectory, filename),
      "utf8"
    );

    const { data, content } = matter(fileContent);

    return {
      data,
      content,
      permalink,
    };
  });
}

export function getCSS() {
  const CSS = fs.readdirSync(CSSDirectory);

  return CSS.map((filename) => {
    const permalink = filename.replace(".md", "");
    const fileContent = fs.readFileSync(
      path.join(CSSDirectory, filename),
      "utf8"
    );

    const { data, content } = matter(fileContent);

    return {
      data,
      content,
      permalink,
    };
  });
}

export const blogPosts = [{}];
