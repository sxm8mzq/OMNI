Feature: New Registered User Place Bodfs Order With CTLP With HD Card In English

  Background: User launches url
    Given the user launches the url

  @e2e @regressionTest @newRegisteredUser @mCycle @hdcc
  Scenario Outline: New registered user should be able to place bodfs order with ctlp with hd card
    Then the user enters text "7001" in textbox with placeholder "Postal Code, City, or Store Number"
    Then the user clicks on the "search" icon at index "2"
    Then the user waits for text "SCARBOROUGH #7001" to be visible
    Then the user click on "Select"
    Then the user click on " Account / Sign In "
    Then the user waits for text "Email Address" to be visible
    Then the user click on " Create an Account "
    Then the user click on "Create Personal Account"
    Then the user enters text "<firstName>" in the textbox "First Name"
    Then the user enters text "<lastName>" in the textbox "Last Name"
    Then the user enters random email in the textbox "Email Address"
    Then the user enters text "<password>" in the textbox "Password"
    Then the user enters text "<postalCode>" in the textbox "Postal Code"
    Then the user clicks on the "Create Account" button at index "2"
    Then the user validates if " Your Account Has Been Created! " text is visible
    Then the user presses keyboard key "Escape"
    Then the user validates if " Hi <firstName>, My Account " text is visible
    Then the user enters text sku in textbox with placeholder "What can we help you find?"
    Then the user clicks on the "search" icon at index "1"
    Then the user waits for text "Add To Cart" to be visible
    Then the user validates if " Want it Installed? " text is visible
    Then the user validates if " Connect me to Local Pros " text is visible
    Then the user validates if " What are Local Pros? " text is visible
    Then the user clicks on the link "<postalCode>" at index "2"
    Then the user validates if " Enter the postal code of your job site to check availability of Local Pros: " text is visible
    Then the user enters text "<postalCodeLP>" in the textbox " Enter the postal code of your job site to check availability of Local Pros: "
    Then the user presses keyboard key "Enter"
    Then the user selects the radio button " Connect me to Local Pros "
    Then the user validates if " Local Pros are available near " text is visible
    Then the user validates if "Connect me to Local Pros" checkbox is selected
    Then the user add product to cart
    Then the user click on "View Cart"
    Then the user waits for text "My Cart: " to be visible
    Then the user click on " Today within 3 hours "
    Then the user waits for text " 3-Hour Delivery: " to be visible
    Then the user click on "Checkout Now"
    Then the user waits for text "Secure Checkout" to be visible
    Then the user validates if the delivery form is available
    Then the user enters text "<firstName>" in the textbox "First Name"
    Then the user enters text "<lastName>" in the textbox "Last Name"
    Then the user enters text "<phoneNum>" in the textbox "Phone"
    Then the user enters text "<city>" in the textbox "City"
    Then the user enters value "<province>" in dropdown "Province"
    Then the user enters text "<address>" in textbox with placeholder "Start typing your address..."
    Then the user click on "Continue"
    Then the user waits for text "Apply a Gift Card" to be visible
    Then the user switches to the frame "__zoid__card_sdk"
    Then the user enters the "Hdcc" card details
    Then the user switches to the parent frame
    Then the user enters billing details for "Hdcc" card
    Then the user click on "Continue"
    Then the user waits for text "Place Order " to be visible
    Then the user clicks on text "Place Order" at index "2"
    Then the user waits for text " Confirmation " to be visible
    Then the user waits for text " Your order was successful. " to be visible
    Then the user validates if " Your order was successful. " text is visible
    Then the user validates if the text " Order Number:" is visible at index "1"
    Then the user validates if " EXPRESS DELIVERY: " text is visible

    Examples:
      | firstName | lastName | password | postalCode | address            | city        | province | phoneNum   | postalCodeLP |
      | John      | Doe      | Test@123 | M1R 4E6    | 428 Ellesmere road | Scarborough | Ontario  | 2365678914 | M1R 4E3      |