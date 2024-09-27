Feature: Guest User BOSS verify alternate pickup person details in order confirmation page

  Background: User launches url
    Given the user launches the url

  @checkOut @mCycle @regressionTest @guestUser @boss @hdcc
  Scenario Outline: User should able to verify alternate pickup person details in order confirmation page
    Then the user enters text "7001" in textbox with placeholder "Postal Code, City, or Store Number"
    Then the user clicks on the webelement with html tag "title" as "Search"
    Then the user waits for webelement "hdca-store-list-item__column-store" with html attribute "class" to be visible
    Then the user click on "Select"
    Then the user enters text sku in textbox with placeholder "What can we help you find?"
    Then the user clicks on the webelement with html tag "class" as "acl-action-button"
    Then the user waits for webelement "hdca-product" with html attribute "class" to be visible
    Then the user add product to cart
    Then the user click on "View Cart"
    Then the user waits for webelement "acl-image__image" with html attribute "class" to be visible
    Then the user clicks the webelement containing html tag "id" as "fulfillment_BOSS_"
    Then the user validates if webelement with html attribute "id" as "orderSummaryContainer" is visible
    Then the user click on "Checkout Now"
    Then the user click on "Checkout as Guest"
    Then the user waits for text "Secure Checkout" to be visible
    Then the user enters text "<firstName>" in the textbox "First Name"
    Then the user enters text "<lastName>" in the textbox "Last Name"
    Then the user enters random email in the textbox "Email Address"
    Then the user enters text "<phonenumber>" in the textbox "Phone"
    Then the user click on "Someone else will pick up this order"
    Then the user enters the text "<altFirstName>" in the textbox "First Name" at index "5"
    Then the user enters the text "<altLastName>" in the textbox "Last Name" at index "5"
    Then the user enters the text "<email>" in the textbox "Email Address" at index "5"
    Then the user click on "Continue"
    Then the user validates if webelement with html attribute "class" as "acl-display--flex" is visible
    Then the user switches to the frame "__zoid__card_sdk"
    Then the user enters the "Hdcc" card details
    Then the user switches to the parent frame
    Then the user enters billing details for "Hdcc" card
    Then the user click on "Continue"
    Then the user waits for text "Place Order " to be visible
    Then the user clicks on text "Place Order" at index "2"
    Then the user waits for webelement "acl-container acl-container--theme-dark acl-p--small" with html attribute "class" to be visible
    Then the user validates if " Your order was successful. " text is visible
    Then the user validates if the webelement with html attribute "class" as "acl-col--12 acl-text-size--x-large" has text "Order Number"
    Then the user validates if " Alternate Pick-Up Person: " text is visible
    Then the user validates if webelement with html attribute "class" as "acl-weight--bold ctHidden" is visible

    Examples:
      | firstName | lastName   | altFirstName | altLastName  | phonenumber | email             |
      | Testuser  | Automation | TestOrange   | WebdriverIO  | 4163458888  | test234@gmail.com |