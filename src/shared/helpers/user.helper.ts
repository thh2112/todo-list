import { User } from '@modules/user/user.model';

export function extractUserPublicInfo(user: User) {
  return {
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    status: user.status,
  };
}
