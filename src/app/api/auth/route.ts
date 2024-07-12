import type { NextApiRequest, NextApiResponse } from 'next'
import { handlers } from '@/lib/auth'
import requestProfile from '@/lib/auth-handler'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const app = {
    use: (_middleware: any) => {},
    get: (path: string, handler: Function) => {
      if (req.method === 'GET' && req.url?.startsWith(path)) {
        handler(req, res)
      }
    },
    post: (path: string, handler: Function) => {
      if (req.method === 'POST' && req.url?.startsWith(path)) {
        handler(req, res)
      }
    },
  }

  // 附加处理程序
  handlers.attach({ app, ...requestProfile })

  // 如果没有匹配的路由，返回 404
  res.status(404).json({ message: 'Not Found' })
}
