Feature: Guest User BODFS Place Order With Paypal

  Background: User launches url
    Given the user launches the url

  @checkOut @mCycle @regressionTest @guestUser @bodfs @paypal @expressDelivery
  Scenario Outline: User should able to Place Order with Paypal
    Then the user enters text "7001" in textbox with placeholder "Postal Code, City, or Store Number"
    Then the user clicks on the "search" icon at index "2"
    Then the user waits for text "SCARBOROUGH #7001" to be visible
    Then the user click on "Select"
    Then the user enters text sku in textbox with placeholder "What can we help you find?"
    Then the user clicks on the "search" icon at index "1"
    Then the user waits for text "Add To Cart" to be visible
    Then the user add product to cart
    Then the user click on "View Cart"
    Then the user waits for text " Delivery " to be visible
    Then the user clicks on text "Tomorrow " at index "1"
    Then the user click on "Checkout Now"
    Then the user waits for text "Secure Checkout" to be visible
    Then the user click on "Checkout as Guest"
    Then the user waits for text "Delivery:" to be visible
    Then the user enters text "<firstName>" in the textbox " First Name"
    Then the user enters text "<lastName>" in the textbox " Last Name "
    Then the user enters random email in the textbox " Email Address "
    Then the user enters text "<phone>" in the textbox " Phone Number "
    Then the user enters text "<city>" in the textbox " City"
    Then the user enters value "<province>" in dropdown "Province"
    Then the user enters text "<address>" in textbox with placeholder "Start typing your address..."
    Then the user click on "Continue"
    Then the user waits for text "Apply a Gift Card" to be visible
    Then the user clicks on the "paypal" icon at index "1"
    Then the user waits for text " Please sign in to your PayPal account to complete your payment. You will be able to review the order before you place it. " to be visible
    Then the user click on "Continue with"
    Then the user waits for text "Pay with PayPal" to be visible
    Then the user enters text "<paypalUserName>" in textbox with placeholder "Email or mobile number"
    Then the user click on "Next"
    Then the user enters text "<paypalPassword>" in textbox with placeholder "Password"
    Then the user click on "Log In"
    Then the user click on "Complete Purchase"
    Then the user waits for text " Secure Checkout " to be visible
    Then the user click on "Continue"
    Then the user waits for text "Place Order " to be visible
    Then the user clicks on text "Place Order" at index "2"
    Then the user waits for text " Confirmation " to be visible
    Then the user waits for text " Your order was successful. " to be visible
    Then the user validates if " Your order was successful. " text is visible
    Then the user validates if the text " Order Number:" is visible at index "1"
    Then the user validates if " EXPRESS DELIVERY: " text is visible

    Examples:
      | firstName | lastName | address            | city        | province | phone      | paypalUserName  | paypalPassword |
      | Luther    | King     | 428 Ellesmere road | Scarborough | Ontario  | 2365678914 | cabuyer2@thd.ca | 11111111       |