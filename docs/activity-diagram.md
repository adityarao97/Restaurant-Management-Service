```mermaid
graph TD
    Start((Start)) --> A[User Visits Application]
    A --> B{Is User Authenticated?}
    B -->|No| C[Show Login Form]
    B -->|Yes| F[Auth Success]
    C --> D[Input Credentials]
    D --> E{Valid?}
    E -->|No| C
    E -->|Yes| F
    F --> G{Choose Action}
    
    G -->|Search| H[Search Restaurants]
    H --> I[Process Search]
    I --> J{Found?}
    J -->|Yes| K[Show Results]
    J -->|No| L[No Results]
    K --> M[View Details]
    
    M --> N{Rate?}
    N -->|Yes| O[Rate Restaurant]
    N -->|No| G
    O --> G
    
    G -->|Manage| Q{Is Admin?}
    Q -->|Yes| R[Management Panel]
    Q -->|No| X[Access Denied]
    R --> S{Operation}
    S -->|Add| T[Create New]
    S -->|Edit| U[Update]
    S -->|Delete| V[Delete]
    T --> W[Save]
    U --> W
    V --> W
    W --> G
    X --> G
    
    G -->|Profile| Y[User Profile]
    Y --> Z{Action}
    Z -->|Update| AA[Edit]
    Z -->|Password| AB[Change Password]
    AA --> AC[Save Changes]
    AB --> AC
    AC --> G
    
    L --> G
    G -->|Logout| AD[End Session]
    AD --> End((End))