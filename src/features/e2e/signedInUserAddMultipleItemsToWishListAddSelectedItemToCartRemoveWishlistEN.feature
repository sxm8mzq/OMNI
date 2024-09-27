Feature: SignedIn Registered User Add Multiple Items To Wishlist Add Selected Item To Cart Remove Wishlist And Checkout In English

  Background: User launches url
    Given the user launches the url

  @e2e @regressionTest @registeredUser @visaCard @sth @mixedCart @wishList @mCycle
  Scenario Outline: Registered user should able to add multiple items to wishlist
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
    Then the user checks if wishlist is empty
    Then the user enters text sku in textbox with placeholder "What can we help you find?"
    Then the user clicks on the "search" icon at index "1"
    Then the user waits for text "Add To Cart" to be visible
    Then the user validates if the icon "heart-filled" at index "1" is not visible
    Then the user clicks on the "heart-hollow" icon at index "1"
    Then the user waits for text " Saved to List " to be visible
    Then the user clicks on the "hd-logo-en" icon at index "1"
    Then the user presses keyboard key "Escape"
    Then the user enters text "<sku2>" in textbox with placeholder "What can we help you find?"
    Then the user clicks on the "search" icon at index "1"
    Then the user waits for text "Add To Cart" to be visible
    Then the user validates if the icon "heart-filled" at index "1" is not visible
    Then the user clicks on the "heart-hollow" icon at index "1"
    Then the user waits for text " Saved to List " to be visible
    Then the user clicks on the "hd-logo-en" icon at index "1"
    Then the user presses keyboard key "Escape"
    Then the user enters text "<sku3>" in textbox with placeholder "What can we help you find?"
    Then the user clicks on the "search" icon at index "1"
    Then the user waits for text "Add To Cart" to be visible
    Then the user validates if the icon "heart-filled" at index "1" is not visible
    Then the user clicks on the "heart-hollow" icon at index "1"
    Then the user waits for text " Saved to List " to be visible
    Then the user add product to cart
    Then the user click on "Continue Shopping"
    Then the user clicks on the "hd-logo-en" icon at index "1"
    Then the user presses keyboard key "Escape"
    Then the user checks if wishlist is empty
    Then the user waits for text " You have not saved any products yet. " to be visible
    Then the user click on " Cart "
    Then the user waits for text "My Cart: " to be visible
    Then the user click on "Checkout Now"
    Then the user waits for text "Secure Checkout" to be visible
    Then the user validates if the delivery form is available
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
    Then the user enters the "Visa" card details
    Then the user switches to the parent frame
    Then the user enters billing details for "Visa" card
    Then the user click on "Continue"
    Then the user waits for text "Place Order " to be visible
    Then the user clicks on text "Place Order" at index "2"
    Then the user waits for text " Confirmation " to be visible
    Then the user waits for text "Your order was successful. " to be visible
    Then the user validates if " Your order was successful. " text is visible
    Then the user validates if the text " Order Number:" is visible at index "1"
    Then the user validates if " STANDARD SHIPPING: " text is visible

    Examples:
      | email                         | password | firstName | lastName | address            | city        | province | postalCode | phone      | sku2       | sku3       |
      | rebekah_schamberger@yahoo.com | Test@123 | John      | Doe      | 428 Ellesmere Road | Scarborough | Ontario  | M1R 4E6    | 4704243224 | 1001226868 | 1000101252 |