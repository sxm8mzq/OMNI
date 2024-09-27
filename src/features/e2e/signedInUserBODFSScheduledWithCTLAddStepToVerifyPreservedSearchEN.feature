Feature: SignedIn Registered User BODFS Scheduled With CTLP And Verify Preserved Search In English

  Background: User launches url
    Given the user launches the url

  @e2e @regressionTest @bodfs @registeredUser @amex @mCycle
  Scenario Outline: Registered user should able to buy a bodfs scheduled with ctlp and verify preserved search
    Then the user enters text "7001" in textbox with placeholder "Postal Code, City, or Store Number"
    Then the user clicks on the "search" icon at index "2"
    Then the user waits for text "SCARBOROUGH #7001" to be visible
    Then the user click on "Select"
    Then the user click on " Account / Sign In "
    Then the user waits for text "Email Address" to be visible
    Then the user enters text "<email>" in the textbox "Email Address"
    Then the user enters text "<password>" in the textbox "Password"
    Then the user click on "Sign In"
    Then the user validates if " Hi John, My Account " text is visible
    Then the user checks if shipping addresses exists
    Then the user checks if cart is empty
    Then the user enters text sku in textbox with placeholder "What can we help you find?"
    Then the user clicks on the "search" icon at index "1"
    Then the user waits for text "Add To Cart" to be visible
    Then the user validates if placeholder with text "1000481251" is visible
    Then the user scrolls to "Customers Who Viewed this Item Bought"
    Then the user click on "Customers Who Viewed this Item Bought"
    Then the user presses keyboard key "Tab"
    Then the user presses keyboard key "Enter"
    Then the user waits for text "Add To Cart" to be visible
    Then the user go back on browser
    Then the user waits for text "Add To Cart" to be visible
    Then the user validates if placeholder with text "1000481251" is visible
    Then the user validates if " Want it Installed? " text is visible
    Then the user add product to cart
    Then the user validates if " Installation Request " text is not visible
    Then the user click on "View Cart"
    Then the user waits for text "My Cart: " to be visible
    Then the user clicks on text "Tomorrow" at index "1"
    Then the user waits until the spinner is no longer visible
    Then the user validates if " Change  " text is visible
    Then the user validates if "Connect me to Local Pros" checkbox is not selected
    Then the user click on "Connect me to Local Pros"
    Then the user waits until the spinner is no longer visible
    Then the user click on "Checkout Now"
    Then the user waits for text " Cart Summary: " to be visible
    Then the user validates if "Installation Request" text is visible
    Then the user validates if " Select Delivery Options: " text is visible
    Then the user enters text "<firstName>" in the textbox "First Name"
    Then the user enters text "<lastName>" in the textbox "Last Name"
    Then the user enters text "<phoneNum>" in the textbox "Phone"
    Then the user enters text "<city>" in the textbox "City"
    Then the user enters value "<province>" in dropdown "Province"
    Then the user enters text "<postalCode>" in the textbox "Postal Code"
    Then the user enters text "<address>" in textbox with placeholder "Start typing your address..."
    Then the user click on "Continue"
    Then the user waits for text "Credit Card" to be visible
    Then the user switches to the frame "__zoid__card_sdk"
    Then the user enters the "Amex" card details
    Then the user switches to the parent frame
    Then the user enters billing details for "Amex" card
    Then the user click on "Continue"
    Then the user waits for text "Place Order $" to be visible
    Then the user clicks on text "Place Order $" at index "1"
    Then the user waits for text " Confirmation " to be visible
    Then the user waits for text " Your order was successful. " to be visible
    Then the user validates if " Your order was successful. " text is visible
    Then the user validates if the text " Order Number:" is visible at index "1"
    Then the user validates if " EXPRESS DELIVERY: " text is visible
    Then the user validates if "SCHEDULED DELIVERY:" text is visible
    Then the user validates if " We will call or text you about 30 minutes before your delivery. " text is visible
    Then the user validates if "Requested: Local Pro" text is visible

    Examples:
      | email           | password | firstName | lastName    | address            | city        | province | phoneNum   | postalCode |
      | jon99@yahoo.com | Test@123 | Testuser  | WebdriverIO | 428 Ellesmere Road | Scarborough | Ontario  | 4704243224 | M1R 4E6    |