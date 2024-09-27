Feature: Verify SignedIn Registered User Can Add Multiple Items From FBT In English

  Background: User launches url
    Given the user launches the url

  @e2e @regressionTest @fbt @mCycle @masterCard @registeredUser
  Scenario Outline: User should able to add multiple items from fbt in english
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
    Then the user waits for text " Frequently Bought Together " to be visible
    Then the user scrolls to " Frequently Bought Together "
    Then the user validates if "Total Price:" text is visible
    Then the user validates if "Add 3 items to cart" text is visible
    Then the user validates if all frequently bought items checkboxes are checked and components are shown
    Then the user click on "Add 3 items to cart"
    Then the user waits for text "Added To Cart" to be visible
    Then the user click on "View Cart"
    Then the user waits for text "My Cart: " to be visible
    Then the user clicks the webelement containing html tag "id" as "fulfillment_BOPIS_"
    Then the user waits for text " Store Pick-Up: " to be visible
    Then the user click on "Checkout Now"
    Then the user waits for text "Secure Checkout" to be visible
    Then the user validates if the delivery form is available
    Then the user enters text "<firstName>" in the textbox "First Name"
    Then the user enters text "<lastName>" in the textbox "Last Name"
    Then the user enters text "<phoneNum>" in the textbox "Phone"
    Then the user enters text "<city>" in the textbox "City"
    Then the user enters value "<province>" in dropdown "Province"
    Then the user enters text "<postalCode>" in the textbox "Postal Code"
    Then the user enters text "<address>" in textbox with placeholder "Start typing your address..."
    Then the user click on "Continue"
    Then the user waits for text " Pick-Up Store " to be visible
    Then the signed in user selects pickup date
    Then the user click on "Continue"
    Then the user waits for text "Apply a Gift Card" to be visible
    Then the user switches to the frame "__zoid__card_sdk"
    Then the user enters the "Mastercard" card details
    Then the user switches to the parent frame
    Then the user enters billing details for "Mastercard" card
    Then the user click on "Continue"
    Then the user waits for text "Place Order " to be visible
    Then the user clicks on text "Place Order" at index "2"
    Then the user waits for text " Confirmation " to be visible
    Then the user waits for text " Your order was successful. " to be visible
    Then the user validates if " Your order was successful. " text is visible
    Then the user validates if the text " Order Number:" is visible at index "1"
    Then the user validates if " STANDARD SHIPPING: " text is visible
    Then the user validates if " PICK UP IN-STORE: " text is visible

    Examples:
      | email                | password | firstName | lastName | address            | city        | province | phoneNum   | postalCode |
      | lesley24@hotmail.com | Test@123 | John      | Doe      | 428 ellesmere road | Scarborough | Ontario  | 4704243224 | M1R 4E6    |