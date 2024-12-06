# Restaurant Finder UI Wireframes

## 1. Landing Page
```mermaid
graph TD
    subgraph Landing Page
        Header["+------------------------+<br/>|     Restaurant Finder    |<br/>|  [Login] [Register]     |<br/>+------------------------+"]
        SearchBar["|  Search Restaurants...   |<br/>|     [Search Button]      |"]
        Filters["[Cuisine] [Rating] [Price]"]
        RestaurantList["+------------------------+<br/>| Restaurant Card 1       |<br/>| - Name, Image          |<br/>| - Rating, Cuisine      |<br/>| - Quick View Button    |<br/>+------------------------+<br/>| Restaurant Card 2       |<br/>| ...                    |"]
        Footer["+------------------------+<br/>|    Contact | About Us    |<br/>|    © 2023 TechTitans   |<br/>+------------------------+"]
    end

    Header --> SearchBar
    SearchBar --> Filters
    Filters --> RestaurantList
    RestaurantList --> Footer
```

## 2. User Authentication Screens
```mermaid
graph TD
    subgraph Login Screen
        LoginHeader["+------------------------+<br/>|        Login           |<br/>+------------------------+"]
        LoginForm["|  Email:    [          ] |<br/>|  Password: [          ] |<br/>|     [Login Button]      |<br/>|  [Forgot Password?]     |"]
        LoginFooter["Don't have account? Register"]
    end

    subgraph Register Screen
        RegHeader["+------------------------+<br/>|       Register         |<br/>+------------------------+"]
        RegForm["|  Username: [          ] |<br/>|  Email:    [          ] |<br/>|  Password: [          ] |<br/>|  Confirm:  [          ] |<br/>|    [Register Button]    |"]
        RegFooter["Already have account? Login"]
    end
```

## 3. Restaurant Details Page
```mermaid
graph TD
    subgraph Restaurant Details
        RestHeader["+------------------------+<br/>|   Restaurant Name      |<br/>|   ★★★★☆ 4.5/5        |<br/>+------------------------+"]
        RestInfo["|  📍 Address            |<br/>|  📞 Phone              |<br/>|  🍽️ Cuisine           |"]
        PhotoGallery["[Photo Gallery Section]<br/>[ Img1 ] [ Img2 ] [ Img3 ]"]
        Description["Description:<br/>Restaurant details..."]
        Reviews["+------------------------+<br/>| Reviews Section        |<br/>| - User Reviews        |<br/>| - Rating Distribution  |<br/>| [Write Review Button] |"]
    end
```

## 4. User Dashboard
```mermaid
graph TD
    subgraph User Dashboard
        DashHeader["+------------------------+<br/>|    My Dashboard        |<br/>+------------------------+"]
        Profile["[Profile Section]<br/>Username: John Doe<br/>Email: john@email.com"]
        Activities["+------------------------+<br/>| Recent Activities     |<br/>| - Recent Reviews      |<br/>| - Favorite Restaurants |"]
        Settings["[Settings Section]<br/>- Edit Profile<br/>- Change Password<br/>- Notifications"]
    end
```

## 5. Admin Dashboard
```mermaid
graph TD
    subgraph Admin Dashboard
        AdminHeader["+------------------------+<br/>|   Admin Dashboard      |<br/>+------------------------+"]
        Stats["[Statistics Panel]<br/>Users: 1,234<br/>Restaurants: 567<br/>Reviews: 8,901"]
        Management["+------------------------+<br/>| Management Section    |<br/>| - Manage Restaurants  |<br/>| - Manage Users        |<br/>| - Review Reports      |"]
        Actions["[Quick Actions]<br/>- Add Restaurant<br/>- User Reports<br/>- System Status"]
    end
```

## 6. Restaurant Management
```mermaid
graph TD
    subgraph Restaurant Management
        RestMgmtHeader["+------------------------+<br/>| Restaurant Management |<br/>+------------------------+"]
        AddForm["|  Name:     [          ] |<br/>|  Address:  [          ] |<br/>|  Cuisine:  [Dropdown  ] |<br/>|  Phone:    [          ] |"]
        ImageUpload["[Image Upload Section]<br/>[Drop files here]"]
        Details["|  Description:          |<br/>|  [Text Area]          |<br/>|  Operating Hours:      |<br/>|  [Time Selection]      |"]
        SaveButtons["[Save] [Preview] [Cancel]"]
    end
```

## 7. Review System
```mermaid
graph TD
    subgraph Review System
        ReviewHeader["+------------------------+<br/>|    Write a Review      |<br/>+------------------------+"]
        RatingSelect["Rate your experience:<br/>[ ★ ★ ★ ★ ★ ]"]
        ReviewForm["|  Title:    [          ] |<br/>|  Review:              |<br/>|  [Text Area]          |"]
        Photos["Add Photos:<br/>[Upload Section]"]
        SubmitSection["[Submit Review] [Cancel]"]
    end
```

## Design Elements

### Color Scheme
- Primary: #3498db (Blue)
- Secondary: #2ecc71 (Green)
- Accent: #e74c3c (Red)
- Text: #2c3e50 (Dark Blue)
- Background: #ecf0f1 (Light Gray)

### Typography
- Headers: Roboto
- Body: Open Sans
- Accents: Montserrat

### Responsive Design
- Mobile-first approach
- Breakpoints:
  - Mobile: < 768px
  - Tablet: 768px - 1024px
  - Desktop: > 1024px

### Common Elements
- Navigation bar
- Search functionality
- Rating stars
- Action buttons
- Cards for restaurant display
- Forms with validation
- Loading states
- Error messages
- Success notifications 