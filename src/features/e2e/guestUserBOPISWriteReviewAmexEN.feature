Feature: Guest User BOPIS Write A Review Amex EN

  Background: User launches url
    Given the user launches the url

  @e2e @regressionTest @questionAnswer @guestUser @bopis @amex @mCycle @addToCartATCPanel
  Scenario Outline: Guest user should able to write and buy a BOPIS item with an Amex card EN
    Then the user enters text "7001" in textbox with placeholder "Postal Code, City, or Store Number"
    Then the user presses keyboard key "Enter"
    Then the user waits for text "SCARBOROUGH #7001" to be visible
    Then the user click on "Select"
    Then the user enters text sku in textbox with placeholder "What can we help you find?"
    Then the user clicks on the "search" icon at index "1"
    Then the user waits for text "Add To Cart" to be visible
    Then the user clicks on text "Q&A (" at index "1"
    Then the user click on "Ask a question"
    Then the user enters text "<question>" in current textbox
    Then the user presses keyboard key "Tab"
    Then the user enters text "<firstName>" in current textbox
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
    Then the user click on "Added To Cart"
    Then the user presses key "Tab" "9" times
    Then the user presses keyboard key "Enter"
    Then the user click on "View Cart"
    Then the user waits for text "My Cart: " to be visible
    Then the user clicks on text " Select date in checkout " at index "1"
    Then the user validates if " Store Pick-Up " text is visible
    Then the user clicks on text " Select date in checkout " at index "2"
    Then the user validates if " Store Pick-Up " text is visible
    Then the user click on "Checkout Now"
    Then the user waits for text "Secure Checkout" to be visible
    Then the user click on "Checkout as Guest"
    Then the user waits for text "Store Pick-Up:" to be visible
    Then the user enters text "<firstName>" in the textbox "First Name"
    Then the user enters text "<lastName>" in the textbox "Last Name"
    Then the user enters random email in the textbox "Email Address"
    Then the user enters text "<phone>" in the textbox " Phone Number "
    Then the signed in user selects pickup date
    Then the user click on "Continue"
    Then the user waits for text "Credit Card" to be visible
    Then the user switches to the frame "__zoid__card_sdk"
    Then the user enters the "Amex" card details
    Then the user switches to the parent frame
    Then the user enters billing details for "Amex" card
    Then the user click on "Continue"
    Then the user waits for text "Place Order " to be visible
    Then the user clicks on text "Place Order" at index "2"
    Then the user waits for text " Confirmation " to be visible
    Then the user waits for text " Your order was successful. " to be visible
    Then the user validates if " Your order was successful. " text is visible
    Then the user validates if the text " Order Number:" is visible at index "1"
    Then the user validates if " PICK UP IN-STORE: " text is visible

    Examples:
      | question                  | firstName | lastName | phone      | email         | location |
      | Is it an ecological wood? | Test      | User     | 6577989898 | Test@test.com | Toronto  |