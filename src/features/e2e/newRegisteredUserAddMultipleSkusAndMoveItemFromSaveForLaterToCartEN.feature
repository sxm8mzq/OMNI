Feature: New Registered User Can Add Multiple Skus BOSS, BODFS And STH To Cart, Move Item From Save For Later To Cart In English
  
  Background: User launches url
    Given the user launches the url

  @e2e @regressionTest @boss @bodfs @sth @newRegisteredUser @hdcc @mCycle
  Scenario Outline: New registered user can add multiple skus boss, bodfs and sth to cart, move item from save for later to cart before checkout
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
    Then the user enters text "<Boss>" in textbox with placeholder "What can we help you find?"
    Then the user clicks on the "search" icon at index "1"
    Then the user waits for text "Add To Cart" to be visible
    Then the user click on " Ship To Store "
    Then the user add product to cart
    Then the user click on "Continue Shopping"
    Then the user clicks on the "hd-logo-en" icon at index "1"
    Then the user presses keyboard key "Escape"
    Then the user enters text "<Bodfs>" in textbox with placeholder "What can we help you find?"
    Then the user clicks on the "search" icon at index "1"
    Then the user waits for text "Add To Cart" to be visible
    Then the user click on " Delivery "
    Then the user add product to cart
    Then the user click on "View Cart"
    Then the user waits for text "My Cart: " to be visible
    Then the user click on " Model: 9103 "
    Then the user presses key "Tab" "3" times
    Then the user presses keyboard key "Enter"
    Then the user waits until the spinner is no longer visible
    Then the user clicks on the "hd-logo-en" icon at index "1"
    Then the user presses keyboard key "Escape"
    Then the user enters text "<Sth>" in textbox with placeholder "What can we help you find?"
    Then the user clicks on the "search" icon at index "1"
    Then the user waits for text "Add To Cart" to be visible
    Then the user click on " Delivery "
    Then the user add product to cart
    Then the user click on "View Cart"
    Then the user waits for text "My Cart: " to be visible
    Then the user validates if "2 item(s) " text is visible
    Then the user validates if " 1 item(s) " text is visible
    Then the user validates if "Move to Cart" text is visible
    Then the user click on "Move to Cart"
    Then the user validates if "3 item(s) " text is visible
    Then the user validates if "Move to Cart" text is not visible
    Then the user clicks the webelement containing html tag "id" as "fulfillment_BOPIS_"
    Then the user click on "Checkout Now"
    Then the user waits for text "Secure Checkout" to be visible
    Then the user waits for text " Cart Summary: " to be visible
    Then the user enters text "<phoneNum>" in the textbox "Phone"
    Then the user validates if " Pick-Up Store " text is visible
    Then the user validates if " Ship to Store " text is visible
    Then the signed in user selects pickup date
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
    Then the user validates if " PICK UP IN-STORE: " text is visible
    Then the user validates if " SHIP TO STORE: " text is visible

    Examples:
      | password | Boss       | Bodfs      | Sth        | firstName | lastName | postalCode | address            | city        | province | phoneNum   |
      | Test@123 | 1000720454 | 1000100110 | 1000791787 | James     | Evans    | M1R 4E6    | 428 Ellesmere Road | Scarborough | Ontario  | 4123456792 |