# Restaurant Finder Use Cases

## Actors
1. **Guest User**
   - Can browse restaurants
   - Can search restaurants
   - Can register
   - Can login

2. **Registered User** (extends Guest User)
   - Can rate restaurants
   - Can view profile
   - Can update profile
   - Can change password
   - Can logout

3. **Admin** (extends Registered User)
   - Can manage restaurants (CRUD)
   - Can manage users
   - Can view system statistics

## Use Cases

### Authentication
1. **Login**
   - Actor: Guest User
   - Pre-condition: User is not logged in
   - Main Flow:
     1. User enters credentials
     2. System validates credentials
     3. System creates session
   - Post-condition: User is logged in

2. **Register**
   - Actor: Guest User
   - Pre-condition: User doesn't have an account
   - Main Flow:
     1. User provides registration details
     2. System validates information
     3. System creates account
   - Post-condition: New user account created

### Restaurant Management
1. **Search Restaurants**
   - Actor: Any User
   - Main Flow:
     1. User enters search criteria
     2. System displays matching restaurants
     3. User can filter results

2. **View Restaurant Details**
   - Actor: Any User
   - Main Flow:
     1. User selects restaurant
     2. System displays full details
     3. System shows ratings and reviews

3. **Rate Restaurant**
   - Actor: Registered User
   - Pre-condition: User is logged in
   - Main Flow:
     1. User submits rating
     2. User can add review
     3. System updates restaurant rating

4. **Manage Restaurants**
   - Actor: Admin
   - Pre-condition: User has admin privileges
   - Main Flow:
     1. Admin can add new restaurants
     2. Admin can edit restaurant details
     3. Admin can delete restaurants
     4. Admin can view all restaurants

### User Management
1. **View Profile**
   - Actor: Registered User
   - Pre-condition: User is logged in
   - Main Flow:
     1. User accesses profile
     2. System displays user information

2. **Update Profile**
   - Actor: Registered User
   - Pre-condition: User is logged in
   - Main Flow:
     1. User modifies profile information
     2. System validates changes
     3. System updates profile

3. **Manage Users**
   - Actor: Admin
   - Pre-condition: User has admin privileges
   - Main Flow:
     1. Admin can view all users
     2. Admin can edit user details
     3. Admin can delete users
     4. Admin can change user roles 