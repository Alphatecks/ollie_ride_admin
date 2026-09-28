# Firestore Collections Structure - Complete Field List

Based on comprehensive UI scan of all components, here are the required fields for each collection:

## 1. **vehicles** Collection

### Fields Required:
```javascript
{
  // Basic Information
  vehicleName: string,           // e.g., "Honda Civic 2009"
  vehicleId: string,            // e.g., "#6637383"
  licensePlate: string,          // e.g., "HH292JHA"
  category: string,              // e.g., "SUV", "Sedan", "Hatchback", "Luxury"
  type: string,                  // e.g., "Sedan", "SUV"
  class: string,                 // e.g., "Economy", "Standard", "Premium", "Compact", "Mid-size"
  transmission: string,          // e.g., "Automatic", "Manual"
  
  // Status & Availability
  status: string,                // "Available", "Maintenance", "Booked"
  currentMileage: string,         // e.g., "15,000 miles"
  rentalRate: string,           // e.g., "N67.000"
  
  // Dates
  registrationDate: timestamp,   // Date of registration with time
  lastRentalDate: timestamp,     // Last rental date
  nextMaintenanceDate: timestamp, // Next scheduled maintenance
  
  // Images
  frontImageUrl: string,         // URL to car-front.png or Firebase Storage path
  sideImageUrl: string,          // URL to car-side.png or Firebase Storage path
  
  // Statistics
  totalRentals: number,          // Total number of rentals
  totalEarnings: number,         // Total earnings (as number, e.g., 362000)
  
  // Metadata
  createdAt: timestamp,
  updatedAt: timestamp
}
```

---

## 2. **maintenance** Collection

### Fields Required:
```javascript
{
  // Vehicle Reference
  vehicleId: string,             // Reference to vehicle document ID
  vehicleName: string,           // e.g., "Toyota Corolla 2020"
  licensePlate: string,          // e.g., "HH456JJA"
  
  // Maintenance Details
  maintenanceType: string,       // e.g., "Oil Change", "Battery Replacement", "Tyre Rotation", "Brake Inspection"
  scheduledDate: timestamp,       // Scheduled maintenance date
  
  // Status
  status: string,                // "In Progress", "Completed", "Scheduled", "Overdue"
  
  // Metadata
  createdAt: timestamp,
  updatedAt: timestamp,
  completedAt: timestamp         // When maintenance was completed (if applicable)
}
```

---

## 3. **rentals** Collection

### Fields Required:
```javascript
{
  // Rental Identification
  rentalId: string,              // e.g., "#22352627"
  
  // Customer Information
  customerName: string,          // e.g., "Okoro Francis"
  userId: string,                // Reference to user document ID
  contactDetails: string,        // Phone number or email
  
  // Vehicle Information
  vehicleId: string,             // Reference to vehicle document ID
  vehicleName: string,           // e.g., "Range Rover Sport 2019"
  licenseNumber: string,         // Vehicle license plate
  
  // Rental Period
  startDate: timestamp,          // Rental start date
  dueDate: timestamp,            // Rental due date
  rentalDuration: string,        // e.g., "14 days"
  remainingDays: number,          // Calculated remaining days
  
  // Pricing
  rentalRate: string,            // e.g., "N67.000"
  
  // Status
  status: string,                 // "Ongoing", "Overdue", "Completed", "Returned"
  
  // Metadata
  createdAt: timestamp,
  updatedAt: timestamp,
  returnedAt: timestamp         // When vehicle was returned (if applicable)
}
```

---

## 4. **pricing** Collection

### Fields Required:
```javascript
{
  // Vehicle Reference
  vehicleId: string,             // Reference to vehicle document ID
  vehicleName: string,           // e.g., "Honda Civic 2009"
  category: string,              // e.g., "Sedan"
  
  // Base Pricing
  baseFee: string,               // e.g., "20,000" (per day)
  hourlyRate: number,            // Hourly rate (optional)
  dailyRate: number,             // Daily rate
  lateFee: string,               // e.g., "7,000"
  
  // Seasonal Pricing
  seasonalPricing: boolean,     // Whether seasonal pricing is active
  seasonalStartDate: timestamp,  // Start date for seasonal pricing
  seasonalEndDate: timestamp,   // End date for seasonal pricing
  seasonalAdjustment: string,    // Adjustment amount/percentage
  seasonalDescription: string,   // Optional description
  
  // Status
  isPublished: boolean,          // Whether pricing is published
  
  // Metadata
  createdAt: timestamp,
  updatedAt: timestamp
}
```

---

## 5. **messages** Collection (General Messages)

### Fields Required:
```javascript
{
  // Message Identification
  messageId: string,             // e.g., "#1910"
  
  // Content
  subject: string,               // Message subject
  message: string,               // Message body/content
  
  // Delivery Settings
  messageType: string,           // "Email" or "Text Message"
  startDate: timestamp,          // Start date for message delivery
  endDate: timestamp,            // End date for message delivery
  
  // Status
  status: string,                // "Active", "Inactive"
  
  // Metadata
  createdAt: timestamp,
  updatedAt: timestamp,
  createdBy: string              // Admin user ID who created the message
}
```

---

## 6. **faqs** Collection

### Fields Required:
```javascript
{
  // FAQ Content
  question: string,              // FAQ question
  answer: string,                // FAQ answer
  
  // Status
  status: string,                // "Active", "Deactive"
  
  // Metadata
  createdAt: timestamp,
  updatedAt: timestamp,
  createdBy: string              // Admin user ID who created the FAQ
}
```

---

## 7. **helpTickets** Collection

### Fields Required:
```javascript
{
  // Ticket Identification
  ticketId: string,              // e.g., "#1910"
  
  // Ticket Content
  subject: string,               // Ticket subject/description
  
  // Status & Support
  status: string,                // "Active", "Solved"
  lastUpdate: timestamp,         // Last update timestamp
  support: string,               // Support agent name, e.g., "Mike Rome"
  
  // Metadata
  createdAt: timestamp,
  updatedAt: timestamp,
  createdBy: string,             // User ID who created the ticket
  assignedTo: string             // Support agent user ID
}
```

---

## 8. **registrationRequests** Collection

### Fields Required:
```javascript
{
  // Customer Information
  name: string,                  // Customer name
  phone: string,                 // Phone number
  email: string,                 // Email address
  address: string,               // Full address
  
  // Request Details
  registrationDate: timestamp,    // Date of registration request
  
  // Status
  status: string,                // "Pending", "Approved", "Rejected"
  
  // Documents (Firebase Storage URLs)
  documents: array,               // Array of document URLs
  // e.g., ["gs://bucket/passport1.jpg", "gs://bucket/passport2.jpg"]
  
  // Metadata
  createdAt: timestamp,
  updatedAt: timestamp,
  reviewedBy: string,            // Admin user ID who reviewed
  reviewedAt: timestamp          // When request was reviewed
}
```

---

## 9. **passwordResetRequests** Collection

### Fields Required:
```javascript
{
  // Customer Information
  customerName: string,          // Customer name
  email: string,                 // Email address
  phoneNumber: string,            // Phone number
  userId: string,                // Reference to user document ID
  
  // Request Details
  requestDate: timestamp,         // Date of request
  requestTime: timestamp,        // Time of request (or combine with date)
  method: string,                // "SMS" or "Email"
  
  // Security Information
  ipAddress: string,             // IP address of request
  location: string,              // Location of request
  device: string,                // Device/browser used, e.g., "Safari on macOS"
  
  // Status
  status: string,                // "Pending", "Completed"
  
  // Metadata
  createdAt: timestamp,
  updatedAt: timestamp,
  processedBy: string,           // Admin user ID who processed
  processedAt: timestamp         // When request was processed
}
```

---

## 10. **users** Collection (Already Exists - Additional Fields Found)

### Current Fields (from existing code):
```javascript
{
  name: string,
  email: string,
  phone: string,                 // or phoneNumber
  role: string,                  // "Rider", "Driver", "Admin"
  status: string,               // "active", "inactive", "pending", "suspended"
  registrationDate: timestamp,  // or createdAt
  isActive: boolean,
  isSuspended: boolean,
  pendingVerification: boolean,
  
  // Driver-specific fields (from DriverTable)
  driverLicense: string,        // or licenseNumber
  idNo: string,                 // or idNumber, nationalId
  address: string,               // or houseAddress, homeAddress
  bankDetails: string,          // or bankAccount, accountNumber
  profilePicture: string,       // or avatarUrl, photoURL
  availabilityStatus: string,  // "Online", "Offline"
  
  // Additional fields from UserDetail
  password: string,             // (if storing passwords - not recommended)
  vehiclePlate: string,         // or licensePlate, plateNumber
}
```

---

## 11. **rides** Collection (Already Exists - Additional Fields Found)

### Current Fields (from existing code):
```javascript
{
  // Basic Ride Info
  userId: string,                // Reference to user document ID
  userEmail: string,             // User email
  driverId: string,             // Reference to driver document ID
  driverName: string,           // Driver name
  driverID: string,             // Driver ID string
  driverRating: number,         // Driver rating
  
  // Location
  from: string,                  // or pickupLocation, pickup
  to: string,                    // or dropoffLocation, dropoff
  
  // Timing
  date: timestamp,               // Ride date
  startTime: string,            // or timeStarted
  endTime: string,               // or timeCompleted, timeEnded
  
  // Pricing
  amount: number,                // or totalAmount, price
  fareAmount: number,            // Calculated fare
  
  // Ride Details
  rideType: string,              // or type, e.g., "Economy"
  rating: number,                // or rideRating
  status: string,                // "active", "completed", "cancelled", "in progress"
  
  // Metadata
  createdAt: timestamp
}
```

---

## 12. **payments** Collection (Already Exists - Additional Fields Found)

### Current Fields (from existing code):
```javascript
{
  // Payment Identification
  paymentId: string,             // Payment ID
  
  // References
  userId: string,                // Reference to user document ID
  userEmail: string,            // User email
  rideId: string,               // Reference to ride document ID
  
  // Payment Details
  paymentMethod: string,        // or method, e.g., "Bank transfer", "Debit Card", "Cash"
  amount: number,               // or totalAmount
  dateTime: timestamp,          // or createdAt, date
  
  // Status
  status: string,               // "Completed", "In Progress", "Pending", "Failed"
  
  // Metadata
  createdAt: timestamp
}
```

---

## Summary of Collections to Create:

1. ✅ **vehicles** - Vehicle Database
2. ✅ **maintenance** - Vehicle Maintenance
3. ✅ **rentals** - Rental Desk
4. ✅ **pricing** - Pricing Management
5. ✅ **messages** - General Messages
6. ✅ **faqs** - FAQs
7. ✅ **helpTickets** - Help Tickets
8. ✅ **registrationRequests** - Registration Requests
9. ✅ **passwordResetRequests** - Password Reset Requests

## Collections Already in Use:

- ✅ **users** - User Database (needs some field additions)
- ✅ **rides** - Ride History (needs some field additions)
- ✅ **payments** - Payments (needs some field additions)

---

## Next Steps:

1. Create these collections in Firestore
2. Set up proper indexes for queries
3. Update code to use real Firebase data instead of placeholder data
4. Implement CRUD operations for each collection
5. Set up Firebase Storage for vehicle images and registration documents

