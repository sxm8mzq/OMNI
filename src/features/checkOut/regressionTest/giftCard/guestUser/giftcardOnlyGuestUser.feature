Feature: Verify guest user is able to buy bopis product with giftcard

  Background: User launches url
    Given the user launches the url

  @checkOut @mCycle @regressionTest @giftCard @guestUser
  Scenario Outline: Guest user should able to buy bopis product with giftcard
    Then the user enters text "7001" in textbox with placeholder "Postal Code, City, or Store Number"
    Then the user clicks on the webelement with html tag "title" as "Search"
    Then the user waits for webelement "hdca-store-list-item__column-store" with html attribute "class" to be visible
    Then the user click on "Select"
    Then the user enters text sku in textbox with placeholder "What can we help you find?"
    Then the user clicks on the webelement with html tag "class" as "acl-action-button"
    Then the user waits for webelement "hdca-product" with html attribute "class" to be visible
    Then the user click on " Store Pick-Up "
    Then the user add product to cart
    Then the user click on "View Cart"
    Then the user waits for webelement "acl-image__image" with html attribute "class" to be visible
    Then the user clicks the webelement containing html tag "id" as "fulfillment_BOPIS_"
    Then the user click on "Checkout Now"
    Then the user waits for text "Secure Checkout" to be visible
    Then the user click on "Checkout as Guest"
    Then the user waits for webelement "hdca-checkout-header__title" with html attribute "class" to be visible
    Then the user validates if "Store Pick-Up:" text is visible
    Then the user enters text "<firstName>" in the textbox "First Name"
    Then the user enters text "<lastName>" in the textbox "Last Name"
    Then the user enters random email in the textbox "Email Address"
    Then the user enters text "<phone>" in the textbox "Phone"
    Then the user click on " When would you like to pick up? "
    Then the user clicks on the element with html tag "class" as "acl-mx--xx-small acl-cursor--pointer" at index "1"
    Then the user click on "Continue"
    Then the user validates if "Apply a Gift Card" text is visible
    Then the user click on "Apply a Gift Card"
    Then the user waits for webelement "giftCardContainer" with html attribute "id" to be visible
    Then the user switches to the frame "__zoid__gift_card_micro_ui"
    Then the user enters text "<cardNumber>" in the textbox "Card Number"
    Then the user enters text "<pin>" in the textbox "PIN"
    Then the user switches to the parent frame
    Then the user click on "Apply"
    Then the user waits for webelement "checkout" with html attribute "theme" to be visible
    Then the user validates if "Remove" text is visible
    Then the user verifies if the webelement with html attribute "class" as "acl-display--flex acl-flex--row" at index "2" has text "remaining"
    Then the user validates if the webelement with html attribute "class" as "acl-align--right acl-color--title" has text "$"
    Then the user validates if "Remove" text is visible
    Then the user enters text "<city>" in the textbox "City"
    Then the user enters value "<province>" in dropdown "Province"
    Then the user enters text "<postalCode>" in the textbox "Postal Code"
    Then the user enters text "<address>" in the textbox "Address"
    Then the user click on "Continue"
    Then the user waits for text "Place Order " to be visible
    Then the user clicks on text "Place Order" at index "2"
    Then the user waits for webelement "order-confirmation-success-message" with html attribute "evtperfname" to be visible
    Then the user validates if " Your order was successful. " text is visible
    Then the user validates if the webelement with html attribute "class" as "acl-col--12 acl-text-size--x-large" has text "Order Number"

    Examples:
      | cardNumber              | pin  | firstName | lastName | address            | city        | province | postalCode | phone      |
      | 98062431021560199001185 | 6019 | Jess      | Accred   | 428 Ellesmere Road | Scarborough | Ontario  | M1R 4E6    | 4704243224 |