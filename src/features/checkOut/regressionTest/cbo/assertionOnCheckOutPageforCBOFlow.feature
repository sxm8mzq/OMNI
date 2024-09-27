Feature: Verify Assertion on CheckOut Page for CBO Flow

  Background: User launches url
    Given the user launches the url

  @checkOut @mCycle @regressionTest @cbo
  Scenario Outline: User should be able to verify assertion on checkout page for CBO flow
    Then the user enters text "7001" in textbox with placeholder "Postal Code, City, or Store Number"
    Then the user clicks on the webelement with html tag "title" as "Search"
    Then the user waits for webelement "hdca-store-list-item__column-store" with html attribute "class" to be visible
    Then the user click on "Select"
    Then the user enters text sku in textbox with placeholder "What can we help you find?"
    Then the user clicks on the webelement with html tag "class" as "acl-action-button"
    Then the user waits for webelement "ma-placeholder" with html attribute "class" to be visible
    Then the user click on "Customize and Buy"
    Then the user waits for webelement "ma-placeholder" with html attribute "class" to be visible
    Then the user presses keyboard key "Escape"
    Then the user enters text "WindowName" in the textbox "Name Your Window"
    Then the user click on "Inside Mount"
    Then the user click on "White 5035"
    Then the user click on "Privacy Slats"
    Then the user click on "Add To Cart"
    Then the user waits for webelement "acl-image__image" with html attribute "class" to be visible
    Then the user click on "Checkout Now"
    Then the user click on "Checkout as Guest"
    Then the user waits for webelement "hdca-checkout-header__title" with html attribute "class" to be visible
    Then the user verifies if the webelement with html attribute "class" as "acl-mb--xx-small" at index "1" has text "Window Name: WindowName"
    Then the user verifies if the webelement with html attribute "class" as "acl-weight--bold" at index "3" has text "WindowName"
    Then the user verifies if the webelement with html attribute "class" as "acl-mb--xx-small" at index "2" has text "Width: 12 1/2"
    Then the user verifies if the webelement with html attribute "class" as "acl-weight--bold" at index "4" has text "12 1/2"
    Then the user verifies if the webelement with html attribute "class" as "acl-mb--xx-small" at index "3" has text "Height: 36 0/0"
    Then the user verifies if the webelement with html attribute "class" as "acl-weight--bold" at index "5" has text "36 0/0"
    Then the user verifies if the webelement with html attribute "class" as "acl-weight--bold" at index "6" has text "White 5035"
    Then the user click on "Edit Cart"
    Then the user waits for webelement "acl-image__image" with html attribute "class" to be visible
    Then the user click on "Edit"
    Then the user waits for webelement "ma-placeholder" with html attribute "class" to be visible
    Then the user clears the value from textbox "Name Your Window"
    Then the user enters text "WindowNam2" in the textbox "Name Your Window"
    Then the user click on "Outside Mount"
    Then the user enters the value "<width>" in dropdown with html attribute "name" as "Width-Inches" at index "1"
    Then the user enters the value "<height>" in dropdown with html attribute "name" as "Height-Inches" at index "1"
    Then the user click on "White Sandblast 5951"
    Then the user validates if webelement with html attribute "src" as "value[12020]" is visible
    Then the user scrolls to "Update My Cart"
    Then the user click on "Update My Cart"
    Then the user waits for webelement "acl-image__image" with html attribute "class" to be visible
    Then the user click on "Checkout Now"
    Then the user waits for text "Secure Checkout" to be visible
    Then the user click on "Checkout as Guest"
    Then the user waits for webelement "hdca-checkout-header__title" with html attribute "class" to be visible
    Then the user verifies if the webelement with html attribute "class" as "acl-weight--bold" at index "3" has text "WindowNam2"
    Then the user verifies if the webelement with html attribute "class" as "acl-weight--bold" at index "4" has text "12 1/2"
    Then the user verifies if the webelement with html attribute "class" as "acl-weight--bold" at index "5" has text "26 0/0"
    Then the user verifies if the webelement with html attribute "class" as "acl-weight--bold" at index "6" has text "White Sandblast 5951"
    Then the user click on "More Details"
    Then the user validates if webelement with html attribute "class" as "acl-modal__container" is visible
    Then the user validates if "Base Price" text is visible
    Then the user validates if "Guaranteed to Fit!" text is visible
    Then the user validates if "Mount" text is visible
    Then the user validates if "Width" text is visible
    Then the user validates if "Height" text is visible
    Then the user validates if "Color" text is visible
    Then the user validates if "Lift Control" text is visible
    Then the user validates if "New Tilt" text is visible
    Then the user validates if "Headrail" text is visible
    Then the user validates if "Control Position" text is visible
    Then the user validates if "FW Valance" text is visible
    Then the user validates if webelement with html attribute "class" as "acl-image__image ng-star-inserted" is visible
    Then the user validates if "Levolor" text is visible
    Then the user validates if " Window Name: " text is visible
    Then the user clicks on the webelement with html tag "classname" as "acl-modal__close-svg"

    Examples:
      | width | height |
      | 12    | 26     |