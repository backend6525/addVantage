# Data Harmonization: UsageLimits Component Fix

## Problem Resolved

**MAJOR ISSUE**: Multiple conflicting data sources were storing the same information:

- `adLimits` table ❌ (REMOVED)
- `user` table ⚠️ (Legacy fields kept for compatibility)
- `userCredits` table ✅ (**SINGLE SOURCE OF TRUTH**)

This was causing:

- Progress bar not updating properly
- Inconsistent limit validation
- Frontend-backend data mismatches
- Ad creation limits not being enforced correctly

## Solution Implemented

### 1. **Single Source of Truth: `userCredits` Table**

- All limit and credit data now comes from `userCredits` table ONLY
- Dynamic limits based on account type (Free: 1/5, Pro: 10/50, Enterprise: 50/250)
- Automatic time-based resets (daily/weekly)
- Consistent data across entire application

### 2. **Updated Components**

- **UsageLimits.tsx**: Real-time progress tracking with visual feedback
- **Create.tsx**: Dynamic limit validation using account type
- **API Route**: Simplified to use single source only
- **Backend Functions**: Consolidated to update only `userCredits`

### 3. **Progress Bar Fixed**

- Now properly calculates and displays progress in real-time
- Visual warnings at 70%, 90%, and 100% usage
- Separate daily and weekly progress indicators
- Auto-refresh functionality with manual refresh option

## Files Modified

```
✅ convex/credits.mts - Single source of truth functions
✅ convex/ads.mts - Removed redundant user table updates
✅ convex/schema.ts - Removed adLimits table, documented legacy fields
✅ src/app/api/auth/user/userLimits/route.ts - Simplified API
✅ src/app/components/dashboardUi/SideMenu/UsageLimits.tsx - Fixed progress bar
✅ src/app/components/dashboardUi/CreateAd/Create.tsx - Dynamic limits
✅ src/app/components/dashboardUi/SideMenu/SideMenu.tsx - Pass account type
```

## Migration Required

### Step 1: Run Data Consolidation

```bash
# In Convex dashboard or using CLI:
npx convex run credits:consolidateLegacyData
```

This will:

- Migrate existing data from `user` table to `userCredits`
- Create missing `userCredits` records for all users
- Ensure data consistency

### Step 2: Deploy Schema Changes

```bash
npx convex deploy
```

### Step 3: Test the System

1. Create an ad and verify the progress bar updates immediately
2. Check that limits are enforced correctly
3. Verify refresh button works
4. Test different account types (free/pro/enterprise)

## Account Type Limits

| Account Type | Daily Limit | Weekly Limit |
| ------------ | ----------- | ------------ |
| Free         | 1           | 5            |
| Pro          | 10          | 50           |
| Enterprise   | 50          | 250          |

## Technical Details

### Data Flow (NEW)

```
userCredits table → API → Frontend Components
       ↑
Backend validation
```

### Data Flow (OLD - REMOVED)

```
❌ adLimits table → ???
❌ user table → API → Frontend
❌ userCredits table → Backend validation
```

### Progress Bar Calculation

```typescript
const dailyProgress = Math.min((localCounts.daily / dailyAdLimit) * 100, 100);
const weeklyProgress = Math.min(
	(localCounts.weekly / weeklyAdLimit) * 100,
	100
);
```

### Color Coding

- Green: 0-69% usage
- Yellow: 70-89% usage
- Orange: 90-99% usage
- Red: 100% usage (limit reached)

## Troubleshooting

### If Progress Bar Still Not Working:

1. Check browser console for errors
2. Verify API response contains correct data
3. Run data consolidation migration again
4. Clear browser cache and refresh

### If Limits Not Enforcing:

1. Verify `userCredits` records exist for all users
2. Check account type is set correctly
3. Ensure backend is using `incrementAdCounts` function

### If Data Inconsistent:

1. Run: `npx convex run credits:consolidateLegacyData`
2. Check that all components use same data source
3. Verify no code is reading from legacy `adLimits` table

## Testing Checklist

- [ ] Progress bar updates immediately after ad creation
- [ ] Daily and weekly limits enforce correctly
- [ ] Refresh button works and shows updated data
- [ ] Visual warnings appear at correct thresholds
- [ ] Different account types show correct limits
- [ ] Time-based resets work (daily/weekly)
- [ ] Backend errors are handled gracefully
- [ ] No more "limit reached" errors when UI shows available capacity

## Success Criteria

✅ **Single source of truth**: Only `userCredits` table used for limits
✅ **Real-time updates**: Progress bar reflects actual backend state
✅ **Consistent validation**: Frontend and backend use same logic
✅ **Visual feedback**: Users see clear progress and warnings
✅ **Account-type based limits**: Dynamic limits based on subscription
✅ **Time-based resets**: Automatic daily/weekly limit resets
