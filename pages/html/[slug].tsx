import * as React from "react";
import { getHTML } from "../../lib/data";
import { Layout } from "../../Layout";
import { GetStaticProps, GetStaticPaths } from "next";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import Link from "next/link";
import { useRouter } from "next/router";

interface Props {
  mdxSource: MDXRemoteSerializeResult;
  title: string;
  subtitle: string;
  data: string;
  content: string;
  posts: any;
}

export default function BlogPostPage({
  title,
  subtitle,
  mdxSource,
  posts,
}: Props) {
  const router = useRouter();
  return (
    <Layout title={title}>
      <div className="container px-6 lg:px-10 xl:px-36 2xl:px-40 mx-auto flex">
        <aside
          style={{ height: "calc(100vh - 4.5rem)" }}
          className="lg:w-60 xl:w-72 overflow-y-auto pt-10 sticky top-10 lg:flex hidden flex-col"
        >
          {posts.map((item: any, index: any) => {
            return (
              <Link href={`/html/${item.permalink}`} key={index}>
                <a
                  className={`text-gray-900 ${
                    router.asPath === `/html/${item.permalink}`
                      ? "font-bold"
                      : "hover:text-red-500"
                  }`}
                >
                  {item.title}
                </a>
              </Link>
            );
          })}
        </aside>

        <article className="pt-10 prose max-w-none w-full">
          <h2 className="title">{title}</h2>
          <div className="content">
            <MDXRemote {...mdxSource} />
          </div>
        </article>
      </div>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { params } = ctx;
  const allPost = getHTML();
  const { data, content }: any = allPost.find(
    (blog) => blog.permalink === params?.slug
  );
  const mdxPrism = require("mdx-prism");
  const mdxSource = await serialize(content, {
    mdxOptions: {
      rehypePlugins: [mdxPrism],
    },
  });
  return {
    props: {
      ...data,
      mdxSource,
      posts: allPost.map(({ data, content, permalink }) => ({
        ...data,
        content,
        permalink,
      })),
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: getHTML().map((post) => ({
      params: {
        slug: post.permalink,
      },
    })),
    fallback: false,
  };
};
