Feature: SignedIn Registered User Add Multiple STH Quantity In PIP And Remove Few Before Checkout In English

  Background: User launches url
    Given the user launches the url

  @e2e @regressionTest @registeredUser @hdcc @sth @mCycle
  Scenario Outline: Registered user should able to add multiple quantity in pip and remove few before checkout
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
    Then the user enters value "<increasedNoOfProduct>" in dropdown "Qty"
    Then the user add product to cart
    Then the user click on "Continue Shopping"
    Then the user verifies if cart notification badge in pip is visible
    Then the user verifies if items added to cart is equal to "8"
    Then the user click on " Cart "
    Then the user waits for text "My Cart: " to be visible
    # Then the user validates if product totals are equal on the cart page
    Then the user verifies the cart quantity is equal to "8" at index "1"
    Then the user validates if "8 item(s) " text is visible
    Then the user enters value "<decreasedNoOfProduct>" in dropdown "Qty"
    Then the user waits until the spinner is no longer visible
    Then the user validates if "5 item(s) " text is visible
    Then the user click on "Checkout Now"
    Then the user waits for text " Cart Summary: " to be visible
    Then the user validates if the delivery form is available
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
    Then the user enters the "Hdcc" card details
    Then the user switches to the parent frame
    Then the user enters billing details for "Hdcc" card
    Then the user click on "Continue"
    Then the user waits for text "Place Order $" to be visible
    Then the user clicks on text "Place Order $" at index "1"
    Then the user waits for text " Confirmation " to be visible
    Then the user waits for text " Your order was successful. " to be visible
    Then the user validates if " Your order was successful. " text is visible
    Then the user validates if the text " Order Number:" is visible at index "1"
    Then the user validates if " STANDARD SHIPPING: " text is visible

    Examples:
      | email              | password | firstName | lastName | address            | city        | province | postalCode | phoneNum   | increasedNoOfProduct | decreasedNoOfProduct |
      | corene74@gmail.com | Test@123 | Laila     | Belanger | 428 Ellesmere Road | Scarborough | Ontario  | M1R 4E6    | 4569089080 | 8                    | 5                    |