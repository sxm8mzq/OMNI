Feature: Post Question On PIP Page And Place Order On Boss Item Using Paypal In English

  Background: User launches url
    Given the user launches the url

  @e2e @regressionTest @questionAnswer @guestUser @paypal @boss
  Scenario Outline: Guest user should able to post question on pip page and place order on boss item using paypal in english
    Then the user enters text "7001" in textbox with placeholder "Postal Code, City, or Store Number"
    Then the user clicks on the "search" icon at index "2"
    Then the user waits for text "SCARBOROUGH #7001" to be visible
    Then the user click on "Select"
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
    Then the user click on "Checkout as Guest"
    Then the user waits for text " Cart Summary: " to be visible
    Then the user enters text "<firstName>" in the textbox "First Name"
    Then the user enters text "<lastName>" in the textbox "Last Name"
    Then the user enters random email in the textbox "Email Address"
    Then the user enters text "<phone>" in the textbox "Phone"
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
      | email                     | question                     | nickName | location         | email         | firstName | lastName | address   | city    | province | phone      | extension | paypalUserName  | paypalPassword | postalCode |
      | test1_10_27@homedepot.com | Can this be used in kitchen? | TestUser | Toronto, Ontario | Test@test.com | Luther    | King     | Marine Dr | Markham | Ontario  | 2365678914 | 4567888   | cabuyer2@thd.ca | 11111111       | M1R 4E6    |