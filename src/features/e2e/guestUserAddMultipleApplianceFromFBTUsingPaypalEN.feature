Feature: Guest User Add Multiple Appliance From FBT Using Paypal In English

  Background: User launches url
    Given the user launches the url

  @e2e @regressionTest @guestUser @paypal @appliance @fbt @mCycle @footerLinks
  Scenario Outline: Guest user should able to add multiple appliances from fbt using paypal card
    Then the user enters text "7001" in textbox with placeholder "Postal Code, City, or Store Number"
    Then the user clicks on the "search" icon at index "2"
    Then the user waits for text "SCARBOROUGH #7001" to be visible
    Then the user click on "Select"
    Then the user scrolls to "Subscribe"
    Then the user click on "Subscribe"
    Then the user waits for text " Subscribe to Home Depot Emails " to be visible
    Then the user enters text "<firstName>" in the textbox "First Name"
    Then the user enters text "<lastName>" in the textbox "Last Name"
    Then the user enters text "<postalCode>" in the textbox "Postal Code"
    Then the user enters random email in the textbox "Email Address"
    Then the user click on "The Home Depot Emails"
    Then the user click on "Garden Club Emails"
    Then the user click on "Pro Emails"
    Then the user clicks on the "Subscribe" button at index "1"
    Then the user validates if " Thank you for signing up! " text is visible
    Then the user enters text sku in textbox with placeholder "What can we help you find?"
    Then the user clicks on the "search" icon at index "1"
    Then the user waits for text "Add To Cart" to be visible
    Then the user validates if " Delivery " text is visible
    Then the user validates if " Delivery options for " text is visible
    Then the user validates if "<postalCode>" text is visible 
    Then the user waits for text " Frequently brought togethers " to be visible
    Then the user scrolls to " Frequently brought togethers "
    Then the user validates if "Total Price:" text is visible
    Then the user validates if "Check Availability" text is visible
    Then the user validates if all frequently bought items checkboxes are checked and components are shown
    Then the user click on "Check Availability"
    Then the user waits for text "Add To Cart" to be visible
    Then the user clicks on text "Add To Cart" at index "4"
    Then the user waits until the spinner is no longer visible
    Then the user validates if "View Cart" text is visible
    Then the user click on "View Cart"
    Then the user waits for text "My Cart: " to be visible
    Then the user validates if "2 item(s) " text is visible
    Then the user validates if " Appliance Delivery " text is visible
    Then the user click on "Checkout Now"
    Then the user waits for text "Secure Checkout" to be visible
    Then the user click on "Checkout as Guest"
    Then the user waits for text "Cart Summary:" to be visible
    Then the user enters text "<firstName>" in the textbox "First Name"
    Then the user enters text "<lastName>" in the textbox "Last Name"
    Then the user enters random email in the textbox "Email Address"
    Then the user enters text "<phoneNum>" in the textbox "Phone"
    Then the user enters text "<city>" in the textbox "City"
    Then the user enters value "<province>" in dropdown "Province"
    Then the user enters text "<postalCode>" in the textbox "Postal Code"
    Then the user enters text "<address>" in textbox with placeholder "Start typing your address..."
    Then the user click on "Continue"
    Then the user validates if "Credit Card" text is visible
    Then the user clicks on the "paypal" icon at index "1"
    Then the user click on "Continue with"
    Then the user waits for text "Pay with PayPal" to be visible
    Then the user enters text "<paypalUserName>" in textbox with placeholder "Email or mobile number"
    Then the user click on "Next"
    Then the user enters text "<paypalPassword>" in textbox with placeholder "Password"
    Then the user click on "Log In"
    Then the user click on "Complete Purchase"
    Then the user waits for text "Billing Address:" to be visible
    Then the user click on "Continue"
    Then the user waits for text "Place Order " to be visible
    Then the user clicks on text "Place Order" at index "2"
    Then the user waits for text " Confirmation " to be visible
    Then the user waits for text " Your order was successful. " to be visible
    Then the user validates if the text " Order Number:" is visible at index "1"
    Then the user validates if " APPLIANCE DELIVERY: " text is visible

    Examples:
      | firstName | lastName | postalCode | address            | city        | province | phoneNum   | paypalUserName  | paypalPassword |
      | Clark     | Chen     | M1R 4E6    | 428 Ellesmere Road | Scarborough | Ontario  | 4704243296 | cabuyer2@thd.ca | 11111111       |