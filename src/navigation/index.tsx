// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { createBrowserRouter } from 'react-router-dom'
import Contact, { loader as contactLoader, action as contactAction } from '~/routes/contact'
import EditContact, { action as editAction } from '~/routes/edit'
import ErrorPage from '~/routes/errorPage'
import Root, { loader as rootLoader, action as rootAction } from '~/routes/root'
import { getContacts } from '~/utils'
import { action as destroyAction } from '~/routes/destroy'

export async function loader() {
  const contacts = await getContacts()
  return { contacts }
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    action: rootAction,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          {
            index: true,
            async lazy() {
              const { Index } = await import('~/routes')
              return { Component: Index }
            }
          },
          {
            path: 'contacts/:contactId',
            element: <Contact />,
            loader: contactLoader,
            action: contactAction
          },
          {
            path: 'contacts/:contactId/edit',
            element: <EditContact />,
            loader: contactLoader,
            action: editAction
          },
          {
            path: 'contacts/:contactId/destroy',
            action: destroyAction,
            errorElement: <div>Oops! There was an error.</div>
          }
        ]
      }
    ]
  }
])

export default router
