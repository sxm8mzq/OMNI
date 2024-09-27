Feature: SignedIn Registered User BOPIS Write A Review Amex In English

  Background: User launches url
    Given the user launches the url

  @e2e @regressionTest @bopis @registeredUser @amexCard
  Scenario Outline: Registered user should able to write and buy a bopis item with an amex card in english
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
    Then the user checks if cart is empty
    Then the user enters text sku in textbox with placeholder "What can we help you find?"
    Then the user clicks on the "search" icon at index "1"
    Then the user waits for text "Add To Cart" to be visible
    # Then the user click on "Write a review"
    # To write a review, the system shows a special pop-up window, we don't have a method for that.
    Then the user add product to cart
    Then the user click on "View Cart"
    Then the user waits for text "My Cart: " to be visible
    Then the user clicks the webelement containing html tag "id" as "fulfillment_BOPIS_"
    Then the user waits for text " Store Pick-Up: " to be visible
    Then the user click on "Checkout Now"
    Then the user waits for text "Secure Checkout" to be visible
    Then the user enters text "<phoneNum>" in the textbox "Phone"
    Then the signed in user selects pickup date
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
    Then the user validates if " PICK UP IN-STORE: " text is visible

    Examples:
      | email                      | password | phoneNum   |
      | vicky.ondricka13@gmail.com | Test@123 | 7511243224 |