Feature: SignedIn Registered User Shops By Department Add Sku Checkout With Visa In English

  Background: User launches url
    Given the user launches the url

  @e2e @regressionTest @bopis @registeredUser @visaCard @mCycle
  Scenario Outline: Registered user should able to shop by department add sku checkout with visa in english
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
    Then the user click on "Shop by Department"
    Then the user waits for text "Bath" to be visible
    Then the user click on "Bath"
    Then the user waits for text "Showers & Shower Doors" to be visible
    Then the user click on "Showers & Shower Doors"
    Then the user waits for text "Shower Doors" to be visible
    Then the user click on "Shower Doors"
    Then the user presses keyboard key "Escape"
    Then the user validates if "Scarborough" text is visible
    Then the user clicks on the checkbox "In Stock Today at"
    Then the user waits for webelement "acl-spinner__spinner" with html attribute "class" not to be visible
    Then the user clicks on text "SKU # " at index "2"
    Then the user waits for text "Add To Cart" to be visible
    Then the user add product to cart
    Then the user click on "View Cart"
    Then the user waits for text "My Cart: " to be visible
    Then the user clicks the webelement containing html tag "id" as "fulfillment_BOPIS_"
    Then the user waits for text " Store Pick-Up: " to be visible
    Then the user click on "Checkout Now"
    Then the user waits for text "Secure Checkout" to be visible
    Then the user enters text "<phoneNum>" in the textbox "Phone"
    Then the signed in user selects pickup date
    Then the user waits for text "Apply a Gift Card" to be visible
    Then the user switches to the frame "__zoid__card_sdk"
    Then the user enters the "Visa" card details
    Then the user switches to the parent frame
    Then the user enters billing details for "Visa" card
    Then the user click on "Continue"
    Then the user waits for text "Place Order " to be visible
    Then the user clicks on text "Place Order" at index "2"
    Then the user waits for text " Confirmation " to be visible
    Then the user waits for text " Your order was successful. " to be visible
    Then the user validates if " Your order was successful. " text is visible
    Then the user validates if the text " Order Number:" is visible at index "1"

    Examples:
      | email             | password | phoneNum   |
      | keith68@yahoo.com | Test@123 | 4711243224 |