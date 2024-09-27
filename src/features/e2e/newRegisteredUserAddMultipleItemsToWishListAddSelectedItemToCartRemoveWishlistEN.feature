Feature: New Registered User Add Multiple Items To Wishlist Add Selected Item To Cart Remove Wishlist And Checkout In English

  Background: User launches url
    Given the user launches the url

  @e2e @mCycle @regressionTest @newRegisteredUser @wishList @visaCard
  Scenario Outline: New registered user should able to add multiple items to wishlist add selected item to cart remove wishlist and checkout
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
    Then the user enters text "<sku1>" in textbox with placeholder "What can we help you find?"
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
    Then the user click on " View List "
    Then the user waits for text " LIST SUMMARY " to be visible
    Then the user clicks on text "Add To Cart" at index "3"
    Then the user waits for text "Added To Cart" to be visible
    Then the user click on "Back to List"
    Then the user clicks on the "trash" icon at index "1"
    Then the user waits for text "Are you sure you want to remove " to be visible
    Then the user click on "Remove"
    Then the user validates if "<sku1>" text is not visible
    Then the user clicks on the "trash" icon at index "3"
    Then the user waits for text "Are you sure you want to remove " to be visible
    Then the user click on "Remove"
    Then the user validates if "<sku3>" text is not visible
    Then the user click on " Cart "
    Then the user waits for text "My Cart: " to be visible
    Then the user click on "Checkout Now"
    Then the user waits for text "Secure Checkout" to be visible
    Then the user enters text "<firstName>" in the textbox "First Name"
    Then the user enters text "<lastName>" in the textbox "Last Name"
    Then the user enters text "<phone>" in the textbox "Phone"
    Then the user enters text "<city>" in the textbox "City"
    Then the user enters value "<province>" in dropdown "Province"
    Then the user enters text "<postalCode>" in the textbox "Postal Code"
    Then the user enters text "<address>" in textbox with placeholder "Start typing your address..."
    Then the user click on "Continue"
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
    Then the user validates if " STANDARD SHIPPING: " text is visible

    Examples:
      | firstName | lastName    | password | postalCode | sku1       | sku2       | sku3       | address            | city        | province | phone      |
      | Testuser  | WebdriverIO | Test@123 | M1R 4E6    | 1001238365 | 1001226868 | 1000101252 | 428 Ellesmere Road | Scarborough | Ontario  | 4704243224 |