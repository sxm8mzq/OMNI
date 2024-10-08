Feature: Guest User Place Order On Appliance With PLCC Card In English

  Background: User launches url
    Given the user launches the url

  @e2e @regressionTest @guestUser @appliance @plcc @mCycle
  Scenario Outline: User should able to place order on appliance with plcc commercial card
    Then the user enters text "7001" in textbox with placeholder "Postal Code, City, or Store Number"
    Then the user clicks on the "search" icon at index "2"
    Then the user waits for text "SCARBOROUGH #7001" to be visible
    Then the user click on "Select"
    Then the user enters text sku in textbox with placeholder "What can we help you find?"
    Then the user clicks on the "search" icon at index "1"
    Then the user waits for text "Add To Cart" to be visible
    Then the user validates if " Delivery " text is visible
    Then the user validates if " Delivery options for " text is visible
    Then the user validates if "<postalCode>" text is visible 
    Then the user add product to cart
    Then the user click on "Decline"
    Then the user click on "View Cart"
    Then the user waits for text "My Cart: " to be visible
    Then the user validates if " Appliance Delivery " text is visible
    Then the user click on "Checkout Now"
    Then the user waits for text "Secure Checkout" to be visible
    Then the user click on "Checkout as Guest"
    Then the user waits for text " Cart Summary: " to be visible
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
    Then the user validates if " APPLIANCE DELIVERY: " text is visible

    Examples:
      | firstName | lastName    | address       | city        | province | postalCode | phoneNum   |
      | Address   | WebdriverIO | 621 Rue Habel | Scarborough | Ontario  | M1R 4E6    | 4700148224 |