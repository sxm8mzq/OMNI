Feature: Signed In User Place Order With Visa Card Donation

  Background: User launches url
    Given the user launches the url

  @checkOut @mCycle @regressionTest @homePageSignedInUser @bopis @amex @cswe @donation
  Scenario Outline: User should able to place donation order with visa card bopis
    Then the user enters text "7001" in textbox with placeholder "Postal Code, City, or Store Number"
    Then the user clicks on the webelement with html tag "title" as "Search"
    Then the user waits for webelement "hdca-store-list-item__column-store" with html attribute "class" to be visible
    Then the user click on "Select"
    Then the user click on " Account / Sign In "
    Then the user waits for webelement "acl-mt--x-large acl-mx--medium" with html attribute "class" to be visible
    Then the user enters text "<email>" in the textbox "Email Address"
    Then the user enters text "<password>" in the textbox "Password"
    Then the user waits for webelement "submit" with html attribute "type" to be visible
    Then the user clicks on the webelement with html tag "type" as "submit"
    Then the user validates if " Hi John, My Account " text is visible
    Then the user checks if cart is empty
    Then the user enters text sku in textbox with placeholder "What can we help you find?"
    Then the user clicks on the webelement with html tag "class" as "acl-action-button"
    Then the user waits for webelement "hdca-product" with html attribute "class" to be visible
    Then the user add product to cart
    Then the user click on "View Cart"
    Then the user waits for webelement "acl-image__image" with html attribute "class" to be visible
    Then the user clicks the webelement containing html tag "id" as "fulfillment_BOPIS_"
    Then the user click on "Checkout Now"
    Then the user waits for text "Secure Checkout" to be visible
    Then the user validates if " Hi, John " text is visible
    Then the user enters text "<phone>" in the textbox " Phone Number "
    Then the user validates if "Store Pick-Up:" text is visible
    Then the user validates if " SCARBOROUGH #7001 " text is visible
    Then the user validates if " Pick-Up Store " text is visible
    Then the user validates if " When would you like to pick up? " text is visible
    Then the signed in user selects pickup date
    Then the user click on "Continue"
    Then the user waits for text "Credit Card" to be visible
    Then the user validates if xhref webelement "#check" at index "1" is visible
    Then the user switches to the frame "__zoid__card_sdk"
    Then the user enters the "Amex" card details
    Then the user switches to the parent frame
    Then the user enters billing details for "Amex" card
    Then the user click on "Continue"
    Then the user validates if xhref webelement "#check" at index "2" is visible
    Then the user clicks on the webelement with html tag "class" as "acl-text-size--small acl-lheight--large acl-pl--small"
    Then the user validates if "Donation" text is visible
    Then the user waits for text "Place Order " to be visible
    Then the user clicks on text "Place Order" at index "2"
    Then the user waits for webelement "acl-container acl-container--theme-dark acl-p--small" with html attribute "class" to be visible
    Then the user validates if " Your order was successful. " text is visible
    Then the user validates if the webelement with html attribute "class" as "acl-col--12 acl-text-size--x-large" has text "Order Number"
    Then the user validates if " THANK YOU FOR YOUR $2.00 DONATION! " text is visible

    Examples:
      | email                | password | phone      |
      | darian17@hotmail.com | Test@123 | 4567891234 |