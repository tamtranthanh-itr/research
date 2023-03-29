import { redirect } from 'react-router-dom'
import { deleteContact } from '~/utils'

interface IContactAction {
  request: Request
  params: {
    contactId: string
  }
}

export async function action({ params }: IContactAction) {
  // throw new Error('oh dang!')
  await deleteContact(params.contactId)
  return redirect('/')
}
