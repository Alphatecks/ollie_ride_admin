# Firebase Firestore Integration Guide

## Current Setup Status

✅ Firebase is already configured in `firebase.js`
✅ Firestore is initialized and exported as `db`
✅ Firebase Auth is set up
✅ Some collections are already being used

## Collections Currently Referenced in Code

Based on the codebase, these collections are being used:

1. **`users`** - User database
   - Fields: `name`, `email`, `phone`/`phoneNumber`, `role`, `status`, `registrationDate`/`createdAt`
   - Used in: UserDatabase, RideSummary, authThunks

2. **`rides`** - Ride history
   - Fields: `amount`/`totalAmount`
   - Used in: RideSummary, RideCard

## Steps to Fully Integrate Firebase

### Step 1: Verify Your Firestore Collections Structure

You need to ensure these collections exist in your Firestore database with the following structure:

#### Collection: `users`
```javascript
{
  name: string,
  email: string,
  phone: string, // or phoneNumber
  role: string, // "Rider" or "Driver"
  status: string, // "active", "inactive", "pending", "suspended"
  registrationDate: timestamp, // or createdAt
  isActive: boolean, // optional
  isSuspended: boolean, // optional
  pendingVerification: boolean // optional
}
```

#### Collection: `rides`
```javascript
{
  amount: number, // or totalAmount
  userId: string, // reference to user
  driverId: string, // optional
  status: string, // "active", "completed", "cancelled"
  startDate: timestamp,
  endDate: timestamp,
  // Add other ride-related fields as needed
}
```

### Step 2: Set Up Firestore Security Rules

Go to Firebase Console → Firestore Database → Rules and add:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users collection - authenticated users can read, admins can write
    match /users/{userId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && 
                     get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
    
    // Rides collection
    match /rides/{rideId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null;
    }
    
    // Add more collections as needed
    match /vehicles/{vehicleId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null;
    }
    
    match /maintenance/{maintenanceId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null;
    }
  }
}
```

### Step 3: Additional Collections to Create

Based on your application screens, you may need:

1. **`vehicles`** - Vehicle database
2. **`maintenance`** - Vehicle maintenance records
3. **`rentals`** - Rental desk records
4. **`messages`** - General messages
5. **`faqs`** - FAQ entries
6. **`helpTickets`** - Help tickets

### Step 4: Test Firebase Connection

Create a test file to verify your connection:

```javascript
// test-firebase.js (temporary file)
import { db } from './firebase';
import { collection, getDocs } from 'firebase/firestore';

async function testConnection() {
  try {
    const usersRef = collection(db, 'users');
    const snapshot = await getDocs(usersRef);
    console.log('✅ Firebase connected! Users found:', snapshot.size);
    snapshot.forEach((doc) => {
      console.log('User:', doc.id, doc.data());
    });
  } catch (error) {
    console.error('❌ Firebase connection error:', error);
  }
}

testConnection();
```

## Next Steps

1. **Share your Firestore collections structure** - I can help you map the data correctly
2. **Set up security rules** - Important for production
3. **Create missing collections** - If any are missing
4. **Update data fetching** - I can help integrate real data into all screens

Would you like me to:
- Help you create the missing collections?
- Update the code to use real Firebase data instead of placeholder data?
- Set up proper data structures for all your screens?

