Feature: New Registered User Navigates Through Department And Place Order Using HDCC Card In English

  Background: User launches url
    Given the user launches the url

  @e2e @regressionTest @newRegisteredUser @hdcc
  Scenario Outline: New registered user should be able to navigate through department and place order using HDCC card EN
    Then the user enters text "7001" in textbox with placeholder "Postal Code, City, or Store Number"
    Then the user clicks on the "search" icon at index "2"
    Then the user waits for text "SCARBOROUGH #7001" to be visible
    Then the user click on "Select"
    Then the user click on " Account / Sign In "
    Then the user click on " Create an Account "
    Then the user click on "Create Personal Account"
    Then the user enters text "<firstName>" in the textbox " First Name "
    Then the user enters text "<lastName>" in the textbox " Last Name "
    Then the user enters random email in the textbox " Email Address "
    Then the user enters text "<password>" in the textbox " Password "
    Then the user enters text "<postalCode>" in the textbox " Postal Code "
    Then the user clicks on the "Create Account" button at index "2"
    Then the user presses keyboard key "Escape"
    Then the user validates if " Hi <firstName>, My Account " text is visible
    Then the user click on "Shop by Department"
    Then the user click on "Bath"
    Then the user click on "Showers & Shower Doors"
    Then the user click on "Shower Doors"
    Then the user waits for text "In Stock Today at" to be visible
    Then the user clicks on the checkbox "In Stock Today at"
    Then the user waits until the spinner is no longer visible
    Then the user click on "Recommended"
    Then the user click on "Highest Rated"
    Then the user waits until the spinner is no longer visible
    Then the user clicks on text "SKU # " at index "1"
    Then the user waits for text "Add To Cart" to be visible
    Then the user add product to cart
    Then the user click on "View Cart"
    Then the user waits for text "My Cart: " to be visible
    Then the user click on "Checkout Now"
    Then the user waits for text "Secure Checkout" to be visible
    Then the user enters text "<firstName>" in the textbox "First Name"
    Then the user enters text "<lastName>" in the textbox "Last Name"
    Then the user enters text "<phone>" in the textbox "Phone"
    Then the user enters text "<city>" in the textbox "City"
    Then the user enters value "<province>" in dropdown "Province"
    Then the user enters text "<postalCode>" in the textbox "Postal Code"
    Then the user enters text "<address>" in textbox with placeholder "Start typing your address..."
    Then the user click on "Continue"
    Then the user waits for text "Credit Card" to be visible
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
    Then the user validates if " STANDARD SHIPPING: " text is visible

    Examples:
      | firstName | lastName | password | address            | city        | province | postalCode | phone      |
      | Luther    | Bergeron | Test@123 | 428 Ellesmere Road | Scarborough | Ontario  | M1R 2E6    | 4704243288 |