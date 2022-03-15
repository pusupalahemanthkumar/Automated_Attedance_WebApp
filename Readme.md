## Automated Attendance And Scholarship Management App

### BACKEND END POINTS 

**MICROSERVIES:**
  ```
    Users:
	    @POST -/api/users/login  (LOGIN END POINT)                           
	    @POST -/api/Users/register (REISTER END POINT) 
    Attendance:
        @POST -/api/attendance/add                                       
        @POST -/api/attendance/add-multiple                                  
        @POST -/api/attendance/delete/:rollNumber
        @POST -/api/attendance/get/      
        @GET -/api/attendance/low/    
        @GET -/api/attendance/all/               
    Subjects:
        @UPDATE -/api/subject/classes-taken                                
        @POST -/api/subjects/add                                           
        @DELETE -/api/subjects/delete     
    Notification:
        @POST -/api/notifications/send
   ```
  ### FRONTEND PAGES AND FEATURES
**PAGES:**
```
    -Login Page
    -Register Page
    -Student DashBoard (View Only)
    -Faculty DashBoard (Editable DashBoard)
    -Admin DashBoard (Editable DashBoard)
    -Govt DashBoard (need to develop)