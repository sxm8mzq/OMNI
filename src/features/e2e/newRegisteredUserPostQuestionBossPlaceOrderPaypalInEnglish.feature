Feature: New Registered User Post Question On PIP Page And Place Order On BOSS Item Using Paypal In English

  Background: User launches url
    Given the user launches the url

  @e2e @regressionTest @questionAnswer @paypal @newRegisteredUser @boss
  Scenario Outline: New registered user post question on pip page and place order on boss item using paypal in english
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
    Then the user validates if " Your Account Has Been Created! " text is visible
    Then the user presses keyboard key "Escape"
    Then the user validates if " Hi <firstName>, My Account " text is visible
    Then the user enters text sku in textbox with placeholder "What can we help you find?"
    Then the user clicks on the "search" icon at index "1"
    Then the user waits for text "Add To Cart" to be visible
    Then the user clicks on text "Q&A (" at index "1"
    Then the user click on "Ask a question"
    Then the user enters text "<question>" in current textbox
    Then the user presses keyboard key "Tab"
    Then the user enters text "<nickName>" in current textbox
    Then the user presses keyboard key "Tab"
    Then the user enters text "<email>" in current textbox
    Then the user presses keyboard key "Tab"
    Then the user enters text "<location>" in current textbox
    Then the user presses keyboard key "Tab"
    Then the user presses keyboard key "Enter"
    Then the user presses key "Tab" "3" times
    Then the user presses keyboard key "Enter"
    Then the user presses keyboard key "Enter"
    Then the user scrolls to "Add To Cart"
    Then the user add product to cart
    Then the user click on "View Cart"
    Then the user waits for text "My Cart: " to be visible
    Then the user clicks the webelement containing html tag "id" as "fulfillment_BOSS_"
    Then the user waits for text " Arrives in Store: " to be visible
    Then the user click on "Checkout Now"
    Then the user waits for text "Secure Checkout" to be visible
    Then the user enters text "<phoneNum>" in the textbox "Phone Number"
    Then the user click on "Continue"
    Then the user waits for text "Credit Card" to be visible
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
    Then the user validates if " Your order was successful. " text is visible
    Then the user validates if the text " Order Number:" is visible at index "1"
    Then the user validates if " SHIP TO STORE: " text is visible

    Examples:
      | question                     | nickName | location         | email         | firstName | lastName | password | postalCode | phoneNum   | paypalUserName  | paypalPassword |
      | Can this be used in kitchen? | TestUser | Toronto, Ontario | Test@test.com | Luther    | King     | Test@123 | M1R 4E6    | 4123456789 | cabuyer2@thd.ca | 11111111       |