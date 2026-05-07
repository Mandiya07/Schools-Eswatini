# Security Specification: FireStore Rules
## Data Invariants

1. Users cannot self-assign any role other than "Parent" or "Visitor" upon creation, and cannot self-escalate to "Institution Admin" or "Super Admin".
2. Users cannot modify another user's profile.
3. Only authenticated users with verified emails can write.
4. An Institution Admin can only update settings for their specific institution.
5. Messages can only be read by the sender (Owner), an Institution Admin of the recipient institution, or a Super Admin.
6. Messages cannot be modified by the sender after creation.
7. Only Super Admins can delete institutions.
8. Student progress can only be read by the assigned `teacherId`, the assigned `parentId`, or an admin of the institution.

## The "Dirty Dozen" Payloads

1. **Role Escalation**: Standard user creating user document with `role: "Super Admin"`.
2. **Ghost Admin Creation**: Standard user creating user document with `role: "Institution Admin"`.
3. **Admin Resource Hijack**: Institution Admin updating another institution's info.
4. **Data Bleed Read**: Teacher attempting to read `student_progress` where `teacherId` does not match their own UID.
5. **Cross-Institution Bleed**: Parent attempting to read messages belonging to an institution they are not messaging.
6. **Fake Sender ID (Message)**: User writing a message where `senderId` is another user's UID.
7. **Junk Schema Insert**: User creating an institution with string length sizes over limits or missing required fields.
8. **Shadow Field Injection**: User inserting `isAdmin: true` into a message struct.
9. **Status Fast-Tracking**: Creating an institution directly with `status: "published"`.
10. **Review Spoofing**: User writing a review for an institution but placing a different `userId`.
11. **Orphaned Write**: Creating a review for an `institutionId` that doesn't exist.
12. **PII Data Leak**: Unauthenticated user trying to read a user's email address by listing `users`.
