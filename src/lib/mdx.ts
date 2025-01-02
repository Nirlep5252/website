import { readFile, readdir } from 'fs/promises'
import path from 'path'
import matter from 'gray-matter'

const postsDirectory = path.join(process.cwd(), 'src/content/posts')

export type Post = {
  slug: string
  title: string
  date: string
  content: string
  description: string
  tags: string[]
}

export async function getAllPosts(): Promise<Post[]> {
  const fileNames = await readdir(postsDirectory)
  const allPostsData = await Promise.all(
    fileNames
      .filter((fileName) => fileName.endsWith('.mdx'))
      .map(async (fileName) => {
        const slug = fileName.replace(/\.mdx$/, '')
        const fullPath = path.join(postsDirectory, fileName)
        const fileContents = await readFile(fullPath, 'utf8')
        const { data, content } = matter(fileContents)

        return {
          slug,
          content,
          ...(data as { title: string; date: string; description: string; tags: string[] }),
        }
      })
  )

  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1))
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.mdx`)
    const fileContents = await readFile(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    return {
      slug,
      content,
      ...(data as { title: string; date: string; description: string; tags: string[] }),
    }
  } catch {
    return null
  }
} 