import type { User } from "@/models/user.model";

export function fetchUsers(): Promise<User[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          hashid: 'd9687e6',
          name: 'Ray',
          email: 'maxgray1986@gmail.com'
        },
        {
          hashid: 'u2huy2g',
          name: 'Jane',
          email: 'Jane1990@gmail.com'
        }
      ])
    }, 800)
  })
}